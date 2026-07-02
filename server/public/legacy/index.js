const CONFIG = {
    lerpFactor: 0.3,
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
const State = {
    isResizing: false,
    targetWidth: 250,
    currentWidth: 250,
    animationFrameId: null,
};

const FileManConfig = {
    currentPath: "",
    currentPreviewPath: "",
    cachedItems: [],
};

document.querySelectorAll("a.frameBack").forEach((e) => {
    e.addEventListener("click", () => {
        history.back();
    });
});

const el = (id) => document.getElementById(id);

function handleErrorResponse(status, context) {
    const errorMap = {
        404: { title: "Not found", msg: `The requested item "${context}" does not exist.` },
        403: { title: "Forbidden", msg: "You do not have permission to access this resource." },
        416: { title: "Range error", msg: "The server couldn't stream the requested file chunk." },
        429: { title: "Too many requests", msg: "The server temporarily blocked your requests." },
        500: { title: "SERVER ERROR", msg: "The server encountered an internal glitch." },
    };

    const error = errorMap[status] || { title: "UNKNOWN_ERROR", msg: "An unexpected error occurred." };
    renderError(status, error.title, error.msg);
}

function renderError(code, title, message) {
    const preview = el("preview");

    preview.innerHTML = `
        <div class="frame">
            <div class="frameHeader">
                <span class="frameID">${code}${title}</span>
            </div>
            <div class="frameText">
                <p>${message}</p>
            </div>
            <div class="frameLinkList">
                <div class="social-card" id="btn-refresh">
                    <span>🔄 REFRESH PAGE</span>
                </div>
                <div class="social-card" id="btn-home">
                    <span>🏠 RETURN HOME</span>
                </div>
            </div>
        </div>
    `;

    const refreshBtn = document.getElementById("btn-refresh");
    const homeBtn = document.getElementById("btn-home");

    if (refreshBtn) {
        refreshBtn.addEventListener("click", () => {
            location.reload();
        });
    }

    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            fetchFiles("");
        });
    }
}

const escapeHTML = (str) => {
    const p = document.createElement("p");
    p.textContent = str;
    return p.innerHTML;
};

const getIcon = (item) => {
    if (item.type === "dir") return "📁";
    const ext = item.name.split(".").pop().toLowerCase();
    return CONFIG.iconMap[ext] || "📄";
};

async function fetchFiles(path = "", push = true) {
    try {
        const url = `${CONFIG.apiBase}/list?path=${encodeURIComponent(path)}&type=files`;

        const response = await fetch(url);

        if (!response.ok) {
            handleErrorResponse(response.status, "Directory Access");
            return;
        }

        FileManConfig.cachedItems = await response.json();
        renderList(FileManConfig.cachedItems, path, push);
    } catch (err) {
        console.error("File Fetch Error:", err);
        renderError("500", "CONNECTION_LOST", "Unable to reach the server.");
    }
}

function renderList(items, path, push = true) {
    FileManConfig.currentPath = path;
    const fileList = el("file-list");
    const searchTerm = el("file-search").value.toLowerCase();

    fileList.innerHTML = "";
    const fragment = document.createDocumentFragment();

    if (push) {
        const urlPath = "/" + path.split("/").filter(Boolean).map(encodeURIComponent).join("/");
        history.pushState({ path }, "", urlPath || "/");
    }

    renderBreadcrumbs(path);

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

    items.forEach((item) => {
        if (!item || item.name.endsWith(".data")) return;
        if (searchTerm && !item.name.toLowerCase().includes(searchTerm)) return;

        const div = document.createElement("div");
        div.className = item.type === "dir" ? "folder" : "file";
        if (`files/${item.path}` === FileManConfig.currentPreviewPath) div.classList.add("active-item");

        div.innerHTML = `<span class="icon">${getIcon(item)}</span>${escapeHTML(item.name)}`;

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

async function showPreview(filePath) {
    FileManConfig.currentPreviewPath = "files/" + filePath;
    const ext = filePath.split(".").pop().toLowerCase();
    const downloadUrl = `${CONFIG.apiBase}/download?path=${encodeURIComponent(filePath)}`;

    renderList(FileManConfig.cachedItems, FileManConfig.currentPath, false);

    const isImage = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
        "svg",
        "bmp",
        "ico",
        "tif",
        "tiff",
        "avif",
        "heic",
        "heif",
    ].includes(ext);
    const isVideo = ["mp4", "webm", "avi", "mov", "mkv", "flv", "3gp", "3g2", "asf", "m4v", "mpeg", "mpg"].includes(
        ext,
    );
    const isAudio = [
        "mp3",
        "wav",
        "flac",
        "aac",
        "m4a",
        "ogg",
        "opus",
        "wma",
        "aiff",
        "ac3",
        "dts",
        "ape",
        "au",
        "mid",
        "midi",
    ].includes(ext);
    const isPdf = ext === "pdf";
    const isMarkdown = ["md", "markdown", "rmd", "qmd"].includes(ext);

    const isArchive = [
        "zip",
        "rar",
        "tar",
        "gz",
        "7z",
        "iso",
        "bz2",
        "xz",
        "msi",
        "deb",
        "rpm",
        "apk",
        "dmg",
        "img",
        "vhd",
    ].includes(ext);

    const isDocument = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "rtf", "odt", "odp", "epub", "mobi"].includes(ext);

    const textExtensions = new Set([
        "js",
        "jsx",
        "ts",
        "tsx",
        "html",
        "htm",
        "css",
        "scss",
        "sass",
        "less",
        "vue",
        "svelte",
        "astro",
        "ejs",
        "pug",
        "jade",
        "haml",
        "twig",
        "njk",
        "liquid",
        "hbs",
        "handlebars",
        "mustache",
        "jsp",
        "aspx",
        "ascx",
        "master",
        "cshtml",
        "vbhtml",
        "razor",
        "gsp",
        "cfm",
        "cfc",
        "xhtml",
        "json",
        "jsonc",
        "json5",
        "hjson",
        "xml",
        "yaml",
        "yml",
        "toml",
        "env",
        "ini",
        "properties",
        "prop",
        "plist",
        "reg",
        "inf",
        "cfg",
        "conf",
        "config",
        "csv",
        "tsv",
        "ndjson",
        "proto",
        "textproto",
        "py",
        "pyi",
        "pyc",
        "pyx",
        "java",
        "class",
        "c",
        "cpp",
        "h",
        "hpp",
        "cs",
        "go",
        "rs",
        "rb",
        "php",
        "sh",
        "bash",
        "zsh",
        "fish",
        "ksh",
        "ps1",
        "psm1",
        "psd1",
        "bat",
        "cmd",
        "sql",
        "kt",
        "kts",
        "swift",
        "d",
        "di",
        "mm",
        "m",
        "cxx",
        "cc",
        "hh",
        "hxx",
        "rlib",
        "r",
        "R",
        "jl",
        "lua",
        "luac",
        "pl",
        "pm",
        "t",
        "raku",
        "rakumod",
        "vbs",
        "vb",
        "fs",
        "fsx",
        "fsi",
        "ml",
        "mli",
        "hs",
        "lhs",
        "erl",
        "hrl",
        "ex",
        "exs",
        "eex",
        "leex",
        "heex",
        "clj",
        "cljs",
        "cljc",
        "edn",
        "scala",
        "sc",
        "nim",
        "zig",
        "v",
        "odin",
        "cr",
        "hx",
        "rkt",
        "scm",
        "ss",
        "lisp",
        "cl",
        "lsp",
        "gleam",
        "roc",
        "wgsl",
        "glsl",
        "cu",
        "cuh",
        "hip",
        "sycl",
        "dart",
        "pas",
        "cob",
        "cbl",
        "ada",
        "adb",
        "ads",
        "asm",
        "s",
        "nasm",
        "awk",
        "sed",
        "vala",
        "vapi",
        "mojo",
        "elm",
        "txt",
        "log",
        "patch",
        "diff",
        "tex",
        "ltx",
        "bib",
        "ipynb",
    ]);

    let html = "";

    try {
        if (isImage) {
            html = `<img src="${downloadUrl}" class="preview-image" onerror="handleErrorResponse(404, '${filePath}')">`;
        } else if (isVideo) {
            html = `<video controls src="${downloadUrl}" class="preview-video" onerror="handleErrorResponse(404, '${filePath}')"></video>`;
        } else if (isAudio) {
            html = `
                <div class="preview-audio-container">
                    <div class="preview-audio-icon">${CONFIG.iconMap[ext] || "🎵"}</div>
                    <p class="preview-audio-label">AUDIO_STREAM::${ext.toUpperCase()}</p>
                    <audio controls src="${downloadUrl}" class="preview-audio-player" onerror="handleErrorResponse(404, '${filePath}')"></audio>
                </div>`;
        } else if (isPdf) {
            html = `<embed src="${downloadUrl}" type="application/pdf" class="preview-pdf" />`;
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
        }

        renderMediaPreview(html, filePath);
    } catch (e) {
        console.error("Preview Error:", e);
        renderError("500", "READ_ERROR", "Failed to stream file content.");
    }
}
function renderMediaPreview(mediaHtml, filePath) {
    const filename = filePath.split("/").pop();
    el("preview").innerHTML = `
        <div class="file-preview">
            <h2 style="margin-bottom: 20px; font-size: 1.5rem;">${escapeHTML(filename)}</h2>
            ${mediaHtml}
            <div style="margin-top: 30px;">
                <a href="${CONFIG.apiBase}/download?path=${encodeURIComponent(filePath)}" 
                   download="${filename}" class="button">DOWNLOAD_FILE</a>
            </div>
        </div>
    `;
}
const debounce = (fn, ms) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), ms);
    };
};

el("file-search").addEventListener(
    "input",
    debounce(() => {
        renderList(FileManConfig.cachedItems, FileManConfig.currentPath, false);
    }, 200),
);

window.addEventListener("popstate", (e) => {
    fetchFiles(e.state?.path || "", false);
});

function updateSidebarWidth() {
    const diff = State.targetWidth - State.currentWidth;
    State.currentWidth += diff * CONFIG.lerpFactor;

    el("sidebar").style.width = `${State.currentWidth}px`;

    if (State.isResizing || Math.abs(diff) > 0.1) {
        State.animationFrameId = requestAnimationFrame(updateSidebarWidth);
    } else {
        State.currentWidth = State.targetWidth;
        el("sidebar").style.width = `${State.currentWidth}px`;
        State.animationFrameId = null;
    }
}

const targetWidthChange = (e) => {
    State.targetWidth = Math.min(Math.max(e.clientX, window.innerWidth * 0.15), window.innerWidth * 0.7);
};

const targetWindowResizeWidthChange = () => {
    State.targetWidth = Math.min(Math.max(State.targetWidth, window.innerWidth * 0.15), window.innerWidth * 0.7);

    if (!State.animationFrameId) {
        State.animationFrameId = requestAnimationFrame(updateSidebarWidth);
    }
};

window.addEventListener("resize", targetWindowResizeWidthChange);

el("resizer").addEventListener("mousedown", (e) => {
    e.preventDefault();
    State.isResizing = true;
    document.body.classList.add("resizing-active");

    const onMouseUp = () => {
        State.isResizing = false;
        document.body.classList.remove("resizing-active");
        document.removeEventListener("mousemove", targetWidthChange);
        document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", targetWidthChange);
    document.addEventListener("mouseup", onMouseUp);

    if (!State.animationFrameId) {
        State.animationFrameId = requestAnimationFrame(updateSidebarWidth);
    }
});

fetchFiles(window.location.pathname.slice(1));
