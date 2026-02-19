"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const os_1 = __importDefault(require("os"));
require("./emailService");
let mainWindow = null;
const isDev = process.env.NODE_ENV === "development";
async function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path_1.default.join(__dirname, "preload.js"),
        },
        show: false,
        frame: true, // Set to false if you want custom window controls
    });
    if (isDev) {
        await mainWindow.loadURL("http://localhost:5173");
        mainWindow.webContents.openDevTools();
    }
    else {
        await mainWindow.loadFile(path_1.default.join(__dirname, "../dist/index.html"));
    }
    mainWindow.once("ready-to-show", () => {
        mainWindow?.show();
    });
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
// ========== IPC HANDLERS ==========
// Basic test
electron_1.ipcMain.handle("ping", () => "pong");
// App version
electron_1.ipcMain.handle("get-app-version", () => electron_1.app.getVersion());
// Window controls
electron_1.ipcMain.on("window-minimize", () => {
    mainWindow?.minimize();
});
electron_1.ipcMain.on("window-maximize", () => {
    if (mainWindow?.isMaximized()) {
        mainWindow.unmaximize();
    }
    else {
        mainWindow?.maximize();
    }
});
electron_1.ipcMain.on("window-close", () => {
    mainWindow?.close();
});
electron_1.ipcMain.handle("dialog-select-file", async () => {
    if (!mainWindow)
        return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await electron_1.dialog.showOpenDialog(mainWindow, {
        properties: ["openFile"],
        filters: [
            { name: "All Files", extensions: ["*"] },
            { name: "Text", extensions: ["txt", "text"] },
            { name: "Images", extensions: ["jpg", "png", "gif"] },
        ],
    });
    if (!result.canceled && result.filePaths?.length > 0) {
        return result.filePaths[0];
    }
    return null;
});
// File read
electron_1.ipcMain.handle("file-read", async (event, filePath) => {
    try {
        const content = await promises_1.default.readFile(filePath, "utf-8");
        return { success: true, content };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
// File save
electron_1.ipcMain.handle("file-save", async (event, content, filename) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await electron_1.dialog.showSaveDialog(mainWindow, {
            defaultPath: filename,
            filters: [
                { name: "Text Files", extensions: ["txt"] },
                { name: "All Files", extensions: ["*"] },
            ],
        });
        if (result.filePath) {
            await promises_1.default.writeFile(result.filePath, content, "utf-8");
            return { success: true, path: result.filePath };
        }
        return { success: false, error: "No file selected" };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
// Notifications
electron_1.ipcMain.on("show-notification", (event, title, body) => {
    new electron_1.Notification({ title, body }).show();
});
// System info
electron_1.ipcMain.handle("get-system-info", () => {
    return {
        platform: process.platform,
        arch: process.arch,
        version: process.version,
        electronVersion: process.versions.electron,
        chromeVersion: process.versions.chrome,
        nodeVersion: process.versions.node,
        cpus: os_1.default.cpus().length,
        totalMemory: os_1.default.totalmem(),
        freeMemory: os_1.default.freemem(),
        homedir: os_1.default.homedir(),
        hostname: os_1.default.hostname(),
    };
});
// Handle external links
electron_1.app.on("web-contents-created", (event, contents) => {
    contents.setWindowOpenHandler((details) => {
        electron_1.shell.openExternal(details.url);
        return { action: "deny" };
    });
});
// Optional: Auto-updater handlers (if you add electron-updater)
// ipcMain.handle('check-for-updates', () => { ... });
