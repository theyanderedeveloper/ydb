const express = require("express");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const rateLimit = require("express-rate-limit");
const ffmpeg = require("fluent-ffmpeg");
const morgan = require("morgan");
const zlib = require('zlib');
const { pipeline } = require('stream');

const app = express();
const PORT = 8647;

app.use(morgan("dev"));

const BASE_HTML = path.resolve(__dirname, "public");
const BASE_FILES = path.resolve(__dirname, "files");
const BASE_COMICS = path.resolve(__dirname, "comics");
const BASE_PREVIEWS = path.resolve(__dirname, "previews");

const LOG_DIR = path.join(__dirname, 'logs');
const LATEST_LOG = path.join(LOG_DIR, 'latest.log');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

function rotateLog() {
    if (fs.existsSync(LATEST_LOG)) {
        const stats = fs.statSync(LATEST_LOG);
        const dateString = new Date(stats.birthtime).toISOString().replace(/[:.]/g, '-');
        const archiveName = path.join(LOG_DIR, `${dateString}.log.gz`);

        const gzip = zlib.createGzip();
        const source = fs.createReadStream(LATEST_LOG);
        const destination = fs.createWriteStream(archiveName);

        pipeline(source, gzip, destination, (err) => {
            if (err) console.error('Log rotation failed:', err);
            else fs.unlinkSync(LATEST_LOG);
        });
    }
}

rotateLog();

const originalStdoutWrite = process.stdout.write;

const logStream = fs.createWriteStream(LATEST_LOG, { flags: 'a' });

const combinedLog = (data, ...args) => {
    logStream.write(data, ...args);
    originalStdoutWrite.apply(process.stdout, [data, ...args]);
};

// 3. Apply the override
process.stdout.write = process.stderr.write = combinedLog;
app.set("trust proxy", 1);

let searchIndex = {
    files: [],
    comics: []
};

async function buildIndexForFolder(dirPath, baseDir, indexKey, rootName) {
    try {
        const files = await fsPromises.readdir(dirPath, { withFileTypes: true });

        for (const file of files) {
            if (file.name.startsWith(".") || file.name.startsWith("--") || file.name === "previews") {
                continue;
            }

            const fullPath = path.join(dirPath, file.name);
            const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
            const isDir = file.isDirectory();

            let fileStats = { birthtime: null, mtime: null, size: 0 };
            try {
                fileStats = await fs.stat(fullPath);
            } catch (e) {
            }

            searchIndex[indexKey].push({
                name: file.name,
                type: isDir ? "dir" : "file",
                path: relativePath,
                fullPath: fullPath.replace(/\\/g, "/"),
                searchBase: rootName,
                createdAt: fileStats.birthtime ? fileStats.birthtime.getTime() : null,
                updatedAt: fileStats.mtime ? fileStats.mtime.getTime() : null,
                size: isDir ? 0 : fileStats.size,
            });

            if (isDir) {
                await buildIndexForFolder(fullPath, baseDir, indexKey, rootName);
            }
        }
    } catch (err) {
    }
}

async function refreshSearchIndex() {
    searchIndex = { files: [], comics: [] };

    await buildIndexForFolder(BASE_FILES, BASE_FILES, "files", "files");
    await buildIndexForFolder(BASE_COMICS, BASE_COMICS, "comics", "comics");
}


const createLimiter = (ms, maxLimit) => rateLimit({
    windowMs: ms,
    limit: maxLimit,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => res.status(429).end(),
});

const limiter = createLimiter(1000, 6);
app.use("/api/*", limiter);

const getSafePath = (userPath, baseDir) => {
    if (!userPath) return baseDir;

    let decodedPath;
    try {
        decodedPath = decodeURIComponent(userPath);
    } catch {
        const error = new Error("Invalid path encoding");
        error.status = 400;
        throw error;
    }

    const sanitized = decodedPath.replace(/\0/g, "");
    const resolved = path.resolve(baseDir, sanitized);
    const relative = path.relative(baseDir, resolved);

    const isSafe = relative === "" || (relative && !relative.startsWith("..") && !path.isAbsolute(relative));
    if (!isSafe) {
        const error = new Error("Forbidden: Access Denied");
        error.status = 403;
        throw error;
    }

    return resolved;
};

const getTargetBase = (type) => {
    if (type === "comic") return BASE_COMICS;
    return BASE_FILES;
};

async function processAllPreviews() {
    console.log(`${getDate()} Starting background preview generation...`);

    const VIDEO_EXTENSIONS = new Set(['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm']);

    async function walk(dir) {
        const entries = await fsPromises.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory()) {
                await walk(path.join(dir, entry.name));
            } else {
                const ext = path.extname(entry.name).toLowerCase();

                if (VIDEO_EXTENSIONS.has(ext)) {
                    const relativePath = path.relative(BASE_FILES, path.join(dir, entry.name));
                    const parsed = path.parse(relativePath);

                    const previewDirPath = path.join(BASE_PREVIEWS, parsed.dir, parsed.base);

                    if (!fs.existsSync(previewDirPath)) {
                        console.log(`${getDate()} Generating previews for: ${relativePath}`);
                        await fs.mkdir(previewDirPath, { recursive: true });
                        await generateVideoPreview(path.join(dir, entry.name), previewDirPath);
                    }
                }
            }
        }
    }

    try {
        await walk(BASE_FILES);
        console.log(`${getDate()} Background preview generation finished.`);
    } catch (err) {
        console.error(`${getDate()} Error during background task:`, err);
    }
}

async function generateVideoPreview(filePath, outputFolder) {
    try {
        const RESOLUTIONS = [
            { name: 'raw', height: 'source', bitrate: '0' },
            { name: '144p', height: 144, bitrate: '400k' },
            { name: '240p', height: 240, bitrate: '800k' },
            { name: '360p', height: 360, bitrate: '1400k' },
            { name: '480p', height: 480, bitrate: '2500k' },
            { name: '720p', height: 720, bitrate: '5000k' },
            { name: '1080p', height: 1080, bitrate: '8000k' }
        ];

        for (const res of RESOLUTIONS) {
            const resFolder = path.join(outputFolder, res.name);
            await fsPromises.mkdir(resFolder, { recursive: true });

            const isRaw = res.name === 'raw';

            await new Promise((resolve, reject) => {
                let cmd = ffmpeg(filePath);

                if (isRaw) {
                    // Copy stream without transcoding
                    cmd.outputOptions(['-c', 'copy', '-hls_time', '10', '-hls_list_size', '0', '-f', 'hls']);
                } else {
                    cmd.outputOptions([
                        '-vf', `scale=-2:${res.height}`,
                        '-c:v', 'libx264', '-b:v', res.bitrate,
                        '-profile:v', 'baseline', '-level', '3.0',
                        '-hls_time', '10', '-hls_list_size', '0', '-f', 'hls'
                    ]);
                }

                cmd.output(path.join(resFolder, 'preview.m3u8'))
                    .on('end', resolve)
                    .on('error', reject)
                    .run();
            });
        }
        const masterContent = [
            "#EXTM3U",
            ...RESOLUTIONS.map(res =>
                `#EXT-X-STREAM-INF:BANDWIDTH=${parseInt(res.bitrate) * 1000},RESOLUTION=x${res.height}\n${res.name}/preview.m3u8`
            )
        ].join('\n');

        await fsPromises.writeFile(path.join(outputFolder, 'master.m3u8'), masterContent);
    }
    catch (err) {
        console.log(err)
    }
}

app.get("/api/list", async (req, res, next) => {
    try {
        const targetBase = getTargetBase(req.query.type);
        const dirPath = getSafePath(req.query.path || "", targetBase);

        const files = await fsPromises.readdir(dirPath, { withFileTypes: true });
        const relativeDir = path.relative(targetBase, dirPath);

        const items = await Promise.all(
            files
                .filter(file => !file.name.startsWith(".") && !file.name.startsWith("--") && file.name !== "previews")
                .map(async (file) => {
                    const fullPath = path.join(dirPath, file.name);
                    const fileStats = await fsPromises.stat(fullPath).catch(() => ({ birthtime: null, mtime: null, size: 0 }));
                    const isDir = file.isDirectory();

                    return {
                        name: file.name,
                        type: isDir ? "dir" : "file",
                        path: path.join(relativeDir, file.name).replace(/\\/g, "/"),
                        createdAt: fileStats.birthtime ? fileStats.birthtime.getTime() : null,
                        updatedAt: fileStats.mtime ? fileStats.mtime.getTime() : null,
                        size: isDir ? 0 : fileStats.size,
                    };
                })
        );

        res.json(items);
    } catch (err) {
        if (err.code === "ENOENT" || err.code === "ENOTDIR") {
            return res.status(404).end();
        }
        next(err);
    }
});

app.get("/api/preview", async (req, res, next) => {
    try {
        const { path: relativeFilePath, res: resolution } = req.query;
        if (!resolution) return res.status(400).send("Missing resolution");

        const targetBase = getTargetBase(req.query.type);
        const srcFilePath = getSafePath(relativeFilePath, targetBase);

        const parsed = path.parse(relativeFilePath);
        
        const previewFolder = path.join(BASE_PREVIEWS, parsed.dir, parsed.base);
        const playlistPath = path.join(previewFolder, resolution, "preview.m3u8");

        if (!fs.existsSync(playlistPath)) {
            await fsPromises.mkdir(path.dirname(playlistPath), { recursive: true });
            await generateVideoPreview(srcFilePath, previewFolder);
        }

        res.sendFile(playlistPath);
    } catch (err) {
        next(err);
    }
});

app.use("/api/previews", express.static(BASE_PREVIEWS));

app.get("/api/download", async (req, res, next) => {
    try {
        const isComic = req.query.type === "comic";
        const targetBase = getTargetBase(req.query.type);
        const filePath = getSafePath(req.query.path, targetBase);

        if (isComic || req.query.download === "true") {
            const options = { headers: {} };
            if (isComic) {
                options.headers["Content-Type"] = "application/zip";
            }

            return res.download(filePath, path.basename(filePath), options, (err) => {
                if (err) {
                    if (res.headersSent || err.code === "ECONNRESET" || err.code === "EPIPE") return;
                    if (err.code === "ENOENT") return res.status(404).end();
                    next(err);
                }
            });
        }

        res.sendFile(filePath, { acceptRanges: true }, (err) => {
            if (err) {
                if (res.headersSent || err.code === "ECONNRESET" || err.code === "EPIPE") return;
                if (err.code === "ENOENT") return res.status(404).end();
                next(err);
            }
        });
    } catch (err) {
        next(err);
    }
});

app.get("/search/:category*", (req, res, next) => {
    const { category } = req.params;
    if (["files", "comics"].includes(category)) {
        return res.sendFile(path.join(BASE_HTML, "search", `${category}.html`));
    }
    next();
});

app.get("/api/search", async (req, res, next) => {
    try {
        const { type, query } = req.query;
        const indexKey = (type === "comics" || type === "comic") ? "comics" : "files";

        if (!query || query.trim() === "") {
            return res.json([]);
        }

        const cleanQuery = query.toLowerCase().trim();

        if (searchIndex[indexKey].length === 0) {
            await refreshSearchIndex();
        }

        const results = searchIndex[indexKey].filter(item =>
            item.name.toLowerCase().includes(cleanQuery) ||
            item.path.toLowerCase().includes(cleanQuery) ||
            item.fullPath.toLowerCase().includes(cleanQuery)
        );

        res.json(results.slice(0, 100));
    } catch (err) {
        next(err);
    }
});

app.use(express.static(BASE_HTML, {
    extensions: ["html", "js", "css", "png", "m3u8", "ts"],
    maxAge: "1d",
    immutable: true
}));

app.use((err, req, res, next) => {
    console.error(`${getDate()} Server Error:`, err.stack);
    if (res.headersSent) return;
    res.status(err.status || 500).end();
});

function getDate() {
    return `[${new Date().toLocaleString()}]`
}

app.listen(PORT, "0.0.0.0", async () => {
    console.log(`${getDate()} Server running on port ${PORT}`);
    await fsPromises.mkdir(BASE_FILES, { recursive: true });
    await fsPromises.mkdir(BASE_COMICS, { recursive: true });
    await fsPromises.mkdir(BASE_PREVIEWS, { recursive: true });

    processAllPreviews();
    setInterval(processAllPreviews, 20 * 60 * 1000);
});