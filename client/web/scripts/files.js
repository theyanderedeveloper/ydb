let searchDebounceTimer = null;

const CONFIG = {
    apiBase: "/api",
    iconMap: {
        js: "📜",
        jsx: "⚛️",
        ts: "📘",
        tsx: "⚛️",
        html: "🌐",
        htm: "🌐",
        css: "🎨",
        scss: "🎨",
        sass: "🎨",
        less: "🎨",
        vue: "💚",
        svelte: "🧡",
        astro: "🚀",
        ejs: "🛠️",
        pug: "🐶",
        jade: "🐶",
        haml: "🐹",
        twig: "🌿",
        njk: "🍸",
        liquid: "💧",
        hbs: "🧔",
        handlebars: "🧔",
        mustache: "👨",
        jsp: "☕",
        aspx: "🖥️",
        ascx: "🖥️",
        master: "👑",
        cshtml: "🎯",
        vbhtml: "🎯",
        razor: "🪒",
        gsp: "☕",
        cfm: "☁️",
        cfc: "☁️",
        xhtml: "🌐",

        json: "⚙️",
        jsonc: "⚙️",
        json5: "⚙️",
        hjson: "⚙️",
        xml: "📋",
        yaml: "📋",
        yml: "📋",
        toml: "⚙️",
        env: "🔒",
        ini: "⚙️",
        properties: "📋",
        prop: "📋",
        plist: "🍎",
        reg: "🔑",
        inf: "ℹ️",
        cfg: "⚙️",
        conf: "⚙️",
        config: "⚙️",
        csv: "📈",
        tsv: "📈",
        ndjson: "📈",
        avro: "📦",
        parquet: "📦",
        orc: "📦",
        feather: "🪶",
        pickle: "🥒",
        hdf5: "🗄️",
        h5: "🗄️",
        proto: "📡",
        textproto: "📡",

        py: "🐍",
        pyi: "🐍",
        pyc: "🐍",
        pyx: "🐍",
        java: "☕",
        class: "☕",
        c: "⚙️",
        cpp: "⚙️",
        h: "📋",
        hpp: "📋",
        cs: "🎯",
        go: "🐹",
        rs: "🦀",
        rb: "💎",
        php: "🐘",
        sh: "🐚",
        bash: "🐚",
        zsh: "🐚",
        fish: "🐟",
        ksh: "🐚",
        ps1: "💙",
        psm1: "💙",
        psd1: "💙",
        bat: "💻",
        cmd: "💻",
        sql: "🗄️",
        db: "🗄️",
        sqlite: "🗄️",
        kt: "🎯",
        kts: "🎯",
        swift: "🍎",
        d: "⚙️",
        di: "⚙️",
        mm: "🍏",
        m: "🔢",
        cxx: "⚙️",
        cc: "⚙️",
        "c++": "⚙️",
        hh: "📋",
        hxx: "📋",
        rlib: "🦀",
        mod: "📦",
        gem: "💎",
        ru: "💎",
        erb: "💎",
        rake: "💎",
        r: "📊",
        R: "📊",
        jl: " Julia",
        lua: "🌙",
        luac: "🌙",
        pl: "🐫",
        pm: "🐫",
        t: "🐫",
        raku: "🦋",
        rakumod: "🦋",
        vbs: "📜",
        vb: "📜",
        fs: "🎯",
        fsx: "🎯",
        fsi: "🎯",
        ml: "🐫",
        mli: "🐫",
        hs: "λ",
        lhs: "λ",
        erl: "🧪",
        hrl: "🧪",
        ex: "🧪",
        exs: "🧪",
        eex: "🧪",
        leex: "🧪",
        heex: "🧪",
        clj: "🧩",
        cljs: "🧩",
        cljc: "🧩",
        edn: "🧩",
        scala: "🔴",
        sc: "🔴",
        nim: "👑",
        zig: "⚡",
        v: "⚡",
        odin: "🛡️",
        cr: "💎",
        hx: "❄️",
        rkt: "🚀",
        scm: "🚀",
        ss: "🚀",
        lisp: "🚀",
        cl: "🚀",
        lsp: "🚀",
        gleam: "✨",
        roc: "🦅",
        wgsl: "🎮",
        glsl: "🎮",
        cu: "🏎️",
        cuh: "🏎️",
        hip: "🏎️",
        sycl: "🏎️",
        dart: "🎯",
        pas: "📜",
        cob: "📜",
        cbl: "📜",
        ada: "📜",
        adb: "📜",
        ads: "📜",
        asm: "⚙️",
        s: "⚙️",
        nasm: "⚙️",
        awk: "📜",
        sed: "📜",
        gml: "🎮",
        vala: "📜",
        vapi: "📜",
        pony: "🐎",
        mojo: "🔥",
        elm: "🌳",

        png: "🖼️",
        jpg: "🖼️",
        jpeg: "🖼️",
        gif: "🖼️",
        svg: "🎨",
        webp: "🖼️",
        bmp: "🖼️",
        ico: "🖼️",
        tif: "🖼️",
        tiff: "🖼️",
        psd: "📸",
        xcf: "🎨",
        kra: "🎨",
        ora: "🎨",
        heic: "📱",
        heif: "📱",
        avif: "🖼️",
        mp4: "🎬",
        webm: "🎬",
        avi: "🎬",
        mov: "🎬",
        mkv: "🎬",
        flv: "🎬",
        "3gp": "📱",
        "3g2": "📱",
        asf: "🎬",
        mp3: "🎵",
        wav: "🎵",
        flac: "🎧",
        ogg: "🎵",
        m4a: "🎵",
        aac: "🎵",
        opus: "🎵",
        ac3: "🎵",
        dts: "🎵",
        wma: "🎵",
        ape: "🎵",
        aiff: "🎵",
        au: "🎵",
        mid: "🎹",
        midi: "🎹",

        txt: "📝",
        md: "📖",
        markdown: "📖",
        pdf: "📑",
        doc: "📘",
        docx: "📘",
        xls: "📊",
        xlsx: "📊",
        ppt: "📙",
        pptx: "📙",
        rtf: "📄",
        odt: "📄",
        odp: "📊",
        odg: "🎨",
        epub: "📚",
        mobi: "📖",
        tex: "🎓",
        ltx: "🎓",
        bib: "📚",
        ipynb: "📓",
        rmd: "📊",
        qmd: "📊",

        zip: "📦",
        rar: "📦",
        tar: "📦",
        gz: "📦",
        "7z": "📦",
        iso: "💿",
        bz2: "📦",
        xz: "📦",
        exe: "⚡",
        msi: "📦",
        deb: "📦",
        rpm: "📦",
        apk: "📱",
        dmg: "🍏",
        img: "💿",
        vhd: "💽",

        ai: "🎨",
        eps: "🎨",
        ps: "🎨",
        dxf: "📐",
        dwg: "📐",
        stl: "🧊",
        obj: "🧊",
        gltf: "🧊",
        glb: "🧊",
        fbx: "🧊",
        blend: "🟠",
        c4d: "🧊",
        dot: "📊",
        gv: "📊",
        plantuml: "📊",

        ttf: "✒️",
        otf: "✒️",
        woff: "✒️",
        woff2: "✒️",
        sav: "💾",
        rom: "🕹️",
        nes: "🕹️",
        gba: "🕹️",
        unity3d: "🎮",
        prefab: "🧱",
        asset: "🧱",
        meta: "ℹ️",

        torrent: "🌊",
        pem: "🔑",
        key: "🔑",
        cer: "📜",
        crt: "📜",
        asc: "🔏",
        sig: "🔏",
        gpg: "🔏",
        log: "📄",
        tmp: "⏱️",
        bak: "🔄",
        backup: "🔄",
        old: "🔄",
        patch: "🩹",
        diff: "🩹",
    },
};
const FileManConfig = {
    currentPath: "",
    currentPreviewPath: "",
    cachedItems: [],
    sortBy: "name",
    sortOrder: "asc",
};
const getIcon = (item) => {
    if (item.type === "dir") return "📁";
    const ext = item.name.split(".").pop().toLowerCase();
    return CONFIG.iconMap[ext] || "❓";
};

function sortItems(items) {
    const key = FileManConfig.sortBy;
    const order = FileManConfig.sortOrder === "asc" ? 1 : -1;

    return [...items].sort((a, b) => {
        if (a.type === "dir" && b.type !== "dir") return -1;
        if (a.type !== "dir" && b.type === "dir") return 1;

        let valA, valB;
        if (key === "name") {
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
            return valA.localeCompare(valB) * order;
        }

        if (key === "atime") {
            valA = a.createdAt || 0;
            valB = b.createdAt || 0;
        } else if (key === "mtime") {
            valA = a.updatedAt || 0;
            valB = b.updatedAt || 0;
        } else if (key === "size") {
            valA = a.size || 0;
            valB = b.size || 0;
        }

        return (valA - valB) * order;
    });
}
function handleSort(key) {
    if (FileManConfig.sortBy === key) {
        FileManConfig.sortOrder = FileManConfig.sortOrder === "asc" ? "desc" : "asc";
    } else {
        FileManConfig.sortBy = key;
        FileManConfig.sortOrder = "asc";
    }
    renderList(FileManConfig.cachedItems, FileManConfig.currentPath);
}

function renderSortButtons() {
    const container = el("sort-container");
    if (!container) return;

    const buttons = [
        { key: "name", label: "Name" },
        { key: "atime", label: "Created" },
        { key: "mtime", label: "Modified" },
        { key: "size", label: "Size" }
    ];

    container.innerHTML = buttons.map(btn => {
        const isActive = FileManConfig.sortBy === btn.key;
        const arrow = isActive ? (FileManConfig.sortOrder === "asc" ? " ▴" : " ▾") : "";
        const activeClass = isActive ? "sort-btn active" : "sort-btn";
        return `<button class="${activeClass}" onclick="handleSort('${btn.key}')">${btn.label}${arrow}</button>`;
    }).join("");
}

async function fetchFiles(path = "", push = true) {
    try {
        let cleanPath = path;
        if (cleanPath.startsWith("search/files")) {
            cleanPath = cleanPath.replace(/^search\/files\/?/, "");
        } else if (cleanPath.startsWith("/search/files")) {
            cleanPath = cleanPath.replace(/^\/search\/files\/?/, "");
        }

        const url = `${CONFIG.apiBase}/list?path=${encodeURIComponent(cleanPath)}`;
        const response = await fetch(url);

        if (!response.ok) {
            handleErrorResponse(response.status, "Directory Access");
            return;
        }

        FileManConfig.cachedItems = await response.json();
        renderList(FileManConfig.cachedItems, cleanPath, push);
    } catch (err) {
        console.error("File Fetch Error:", err);
        renderError("500", "Connection lost", "Unable to reach the server.");
    }
}

function renderList(items, path, push = true) {
    FileManConfig.currentPath = path;
    const fileList = el("file-list");
    const searchTerm = el("file-search").value.toLowerCase();

    fileList.innerHTML = "";
    const fragment = document.createDocumentFragment();

    const urlParts = path.split("/").filter(Boolean).join("/");
    const urlPath = urlParts ? `/search/files/${urlParts}` : "/search/files";

    if (push) {
        history.pushState({ path }, "", urlPath);
    }
    renderBreadcrumbs(path);
    renderSortButtons();

    if (path) {
        const upDiv = document.createElement("div");
        upDiv.className = "folder";
        upDiv.innerHTML = `Upper directory`;
        upDiv.onclick = () => {
            const parts = path.split("/").filter(Boolean);
            parts.pop();
            fetchFiles(parts.join("/"));
        };
        fragment.appendChild(upDiv);
    }

    const processedItems = sortItems(items);

    processedItems.forEach((item) => {
        if (searchTerm && !item.name.toLowerCase().includes(searchTerm)) return;

        const div = document.createElement("div");
        div.className = item.type === "dir" ? "folder" : "file";
        if (`files/${item.path}` === FileManConfig.currentPreviewPath) div.classList.add("active-item");

        let sizeString = "";
        let metaString = "";
        if (!(item.type === "dir")) {
            metaString = ` <span class="item-meta">(${formatBytes(item.size)})</span>`;
            if (FileManConfig.sortBy === "atime") {
                metaString = ` <span class="item-meta">(${formatDate(item.createdAt)})</span>`;
            } else if (FileManConfig.sortBy === "mtime") {
                metaString = ` <span class="item-meta">(${formatDate(item.updatedAt)})</span>`;
            }
        }

        div.innerHTML = `<span class="icon">${getIcon(item)}</span>${escapeHTML(item.name)}${sizeString} ${metaString}`;

        div.onclick = () => {
            if (item.type === "dir") {
                el("file-search").value = "";
                fetchFiles(item.path);
            } else {
                showPreview(item.path);
            }
        };
        fragment.appendChild(div);
    });

    fileList.appendChild(fragment);
}

function formatBytes(bytes, decimals = 2) {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function formatDate(timestamp) {
    if (!timestamp) return "Unknown";
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function renderBreadcrumbs(path) {
    const container = el("breadcrumb");
    container.innerHTML = "";

    const parts = ["Files", ...path.split("/").filter(Boolean)];
    parts.forEach((part, i) => {
        const span = document.createElement("span");
        let decodedPath;
        try {
            decodedPath = decodeURIComponent(part);
        } catch (err) {
            throw new Error("Invalid path encoding");
        }

        span.textContent = decodedPath;
        span.className = "breadcrumb-item";

        const targetPath = i === 0 ? "" : parts.slice(1, i + 1).join("/");
        span.onclick = () => fetchFiles(targetPath);

        container.appendChild(span);
        if (i < parts.length - 1) {
            const sep = document.createElement("span");
            sep.textContent = "/";
            sep.className = "breadcrumb-separator";
            container.appendChild(sep);
        }
    });
}

function closePreview() {
    FileManConfig.currentPreviewPath = null;
    const previewEl = el("preview");
    if (previewEl) previewEl.innerHTML = "";
    renderList(FileManConfig.cachedItems, FileManConfig.currentPath);
}

async function showPreview(filePath) {
    FileManConfig.currentPreviewPath = "files/" + filePath;
    const ext = filePath.split(".").pop().toLowerCase();
    const downloadUrl = `${CONFIG.apiBase}/download?path=${encodeURIComponent(filePath)}`;
    renderList(FileManConfig.cachedItems, FileManConfig.currentPath);

    const isImage = [
        "jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico", "tif", "tiff", "avif", "heic", "heif",
    ].includes(ext);
    const isVideo = ["mp4", "webm", "avi", "mov", "mkv", "flv", "3gp", "3g2", "asf", "m4v", "mpeg", "mpg"].includes(
        ext,
    );
    const isAudio = [
        "mp3", "wav", "flac", "aac", "m4a", "ogg", "opus", "wma", "aiff", "ac3", "dts", "ape", "au", "mid", "midi",
    ].includes(ext);
    const isPdf = ext === "pdf";
    const isMarkdown = ["md", "markdown", "rmd", "qmd"].includes(ext);

    const isArchive = [
        "zip", "rar", "tar", "gz", "7z", "iso", "bz2", "xz", "msi", "deb", "rpm", "apk", "dmg", "img", "vhd",
    ].includes(ext);

    const isDocument = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "rtf", "odt", "odp", "epub", "mobi"].includes(ext);

    const textExtensions = new Set([
        "js", "jsx", "ts", "tsx", "html", "htm", "css", "scss", "sass", "less", "vue", "svelte", "astro",
        "ejs", "pug", "jade", "haml", "twig", "njk", "liquid", "hbs", "handlebars", "mustache", "jsp",
        "aspx", "ascx", "master", "cshtml", "vbhtml", "razor", "gsp", "cfm", "cfc", "xhtml", "json",
        "jsonc", "json5", "hjson", "xml", "yaml", "yml", "toml", "env", "ini", "properties", "prop",
        "plist", "reg", "inf", "cfg", "conf", "config", "csv", "tsv", "ndjson", "proto", "textproto",
        "py", "pyi", "pyc", "pyx", "java", "class", "c", "cpp", "h", "hpp", "cs", "go", "rs", "rb",
        "php", "sh", "bash", "zsh", "fish", "ksh", "ps1", "psm1", "psd1", "bat", "cmd", "sql", "kt",
        "kts", "swift", "d", "di", "mm", "m", "cxx", "cc", "hh", "hxx", "rlib", "r", "R", "jl",
        "lua", "luac", "pl", "pm", "t", "raku", "rakumod", "vbs", "vb", "fs", "fsx", "fsi", "ml",
        "mli", "hs", "lhs", "erl", "hrl", "ex", "exs", "eex", "leex", "heex", "clj", "cljs", "cljc",
        "edn", "scala", "sc", "nim", "zig", "v", "odin", "cr", "hx", "rkt", "scm", "ss", "lisp",
        "cl", "lsp", "gleam", "roc", "wgsl", "glsl", "cu", "cuh", "hip", "sycl", "dart", "pas",
        "cob", "cbl", "ada", "adb", "ads", "asm", "s", "nasm", "awk", "sed", "vala", "vapi",
        "mojo", "elm", "txt", "log", "patch", "diff", "tex", "ltx", "bib", "ipynb",
    ]);

    let html = "";

    try {
        if (isImage) {
            html = `<img src="${downloadUrl}" class="preview-image" onerror="handleErrorResponse(404, '${filePath}')">`;
            renderMediaPreview(html, filePath);
        } else if (isVideo || isAudio) {
            try {
                if (isVideo) {
                    const previewUrl = `${CONFIG.apiBase}/preview?path=${encodeURIComponent(filePath)}`;

                    html = `<video controls class="preview-video" id="video-player" poster="/media/logo.png" preload="metadata"></video>`;
                    renderMediaPreview(html, filePath);

                    const video = document.getElementById('video-player');

                    if (Hls.isSupported()) {
                        const hls = new Hls({
                            maxBufferLength: 2, 
                            maxMaxBufferLength: 5
                        });
                        
                        hls.loadSource(previewUrl);
                        hls.attachMedia(video);

                        hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            video.currentTime = 0.1;
                        });

                        const oldClose = window.closePreview;
                        window.closePreview = () => {
                            hls.destroy(); 
                            if (oldClose) oldClose();
                        };
                    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = previewUrl;
                    }
                    
                    return; 
                }

                const res = await fetch(downloadUrl);
                if (!res.ok) {
                    handleErrorResponse(res.status, filePath);
                    return;
                }
                const blob = await res.blob();
                const localMediaUrl = URL.createObjectURL(blob);

                html = `
                <div class="preview-audio-container">
                    <div class="preview-audio-icon">${CONFIG.iconMap[ext] || "🎵"}</div>
                    <p class="preview-audio-label">AUDIO_STREAM::${ext.toUpperCase()}</p>
                    <audio controls src="${localMediaUrl}" class="preview-audio-player"></audio>
                </div>`;

                renderMediaPreview(html, filePath);

                const oldClose = window.closePreview;
                window.closePreview = () => {
                    URL.revokeObjectURL(localMediaUrl);
                    if (oldClose) oldClose();
                };

            } catch (err) {
                console.error("Media streaming failed over tunnel:", err);
                renderError("500", "TUNNEL_STREAM_ERROR", "Failed to compile media stream through tunnel.");
            }
            
        }else if (isPdf) {
            html = `<embed src="${downloadUrl}" type="application/pdf" class="preview-pdf" />`;
            renderWithCloseButton(html);
        } else if (isMarkdown || textExtensions.has(ext)) {
            const res = await fetch(downloadUrl);
            if (!res.ok) {
                handleErrorResponse(res.status, filePath);
                return;
            }

            const text = await res.text();
            if (isMarkdown && typeof marked !== "undefined") {
                html = `<div class="markdown-body preview-markdown">${marked.parse(text)}</div>`;
            } else {
                html = `<pre class="preview-text">${escapeHTML(text)}</pre>`;
            }
            renderWithCloseButton(html);
        } else {
            const icon = CONFIG.iconMap[ext] || "📄";
            const typeLabel = isArchive ? "Archive Package" : isDocument ? "Document" : `${ext.toUpperCase()} File`;

            html = `
                <div class="preview-unknown-container">
                    <div class="preview-unknown-icon">${icon}</div>
                    <h3 style="margin-bottom: 10px;">${typeLabel}</h3>
                    <p style="margin-bottom: 20px;">No live preview available for this format.</p>
                    <code class="preview-unknown-path">PATH: ${filePath}</code>
                    <div style="margin-top: 20px;">
                        <a href="${downloadUrl}" download class="download-button">Download File</a>
                    </div>
                </div>`;
            renderWithCloseButton(html);
        }
    } catch (e) {
        console.error("Preview Error:", e);
        renderError("500", "READ_ERROR", "Failed to stream file content.");
    }
}

function renderWithCloseButton(innerHtml) {
    const previewEl = el("preview");
    if (!previewEl) return;

    previewEl.innerHTML = `
        <div class="preview-wrapper">
            <div class="preview-header">
                <button onclick="closePreview()" class="preview-close-btn" title="Close preview">✕</button>
            </div>
            <div class="preview-content">
                ${innerHtml}
            </div>
        </div>
    `;
}

function renderMediaPreview(mediaHtml, filePath) {
    const filename = filePath.split("/").pop();
    const previewEl = el("preview");
    if (!previewEl) return;

    previewEl.innerHTML = `
        <div class="file-preview">
            <div class="preview-header">
                <button onclick="closePreview()" class="preview-close-btn" title="Close preview">✕</button>
            </div>
            <h2 style="margin-bottom: 20px; font-size: 1.5rem;">${escapeHTML(filename)}</h2>
            ${mediaHtml}
            <div style="margin-top: 30px;">
                <a href="${CONFIG.apiBase}/download?path=${encodeURIComponent(filePath)}"
                   download="${filename}" class="button">DOWNLOAD_FILE</a>
            </div>
        </div>
    `;
}

window.addEventListener("popstate", (e) => {
    fetchFiles(e.state?.path || "", false);
});

const initialPath = window.location.pathname;
const routePrefix = "/search/files";

if (initialPath.startsWith(routePrefix)) {
    const targetDir = initialPath.substring(routePrefix.length).replace(/^\//, "");
    fetchFiles(targetDir);
} else {
    fetchFiles("", false);
}
