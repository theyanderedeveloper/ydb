const { app, BrowserWindow, protocol, net } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

app.commandLine.appendSwitch('ignore-certificate-errors');

protocol.registerSchemesAsPrivileged([
    {
        scheme: 'ydb-app',
        privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true }
    },
    {
        scheme: 'ydb-api',
        privileges: { standard: true, secure: false, supportFetchAPI: true, corsEnabled: true }
    }
]);

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true
        }
    });

    win.setMenuBarVisibility(false);
    win.loadURL('ydb-app://app/index.html');
}
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    if (url.startsWith('https://yandere-database.bore.digital')) {
        event.preventDefault();
        callback(true);
    } else {
        callback(false);
    }
});

app.whenReady().then(() => {
    protocol.handle('ydb-app', (request) => {
        try {
            const parsedUrl = new URL(request.url);
            const absolutePath = path.join(__dirname, 'web', parsedUrl.pathname);
            return net.fetch(pathToFileURL(absolutePath).toString());
        } catch (error) {
            console.error('Failed to parse URL:', error);
            return new Response('Not Found', { status: 404 });
        }
    });

    protocol.handle('ydb-api', async (request) => {
        try {
            const url = new URL(request.url);

            if (url.host === 'list') {
                const remoteUrl = `https://yandere-database.bore.digital/api/list${url.search}`;
                console.log(`Proxying request to: ${remoteUrl}`);

                const response = await net.fetch(remoteUrl, {
                    method: request.method,
                    headers: request.headers
                });

                return response;
            }
            if (url.host === 'download') {
                const remoteUrl = `https://yandere-database.bore.digital/api/download${url.search}`;
                console.log(`Proxying request to: ${remoteUrl}`);

                const response = await net.fetch(remoteUrl, {
                    method: request.method,
                    headers: request.headers
                });

                return response;
            }

            return new Response('API Route Not Found', { status: 404 });
        } catch (error) {
            console.error('API Proxy Error:', error);
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});