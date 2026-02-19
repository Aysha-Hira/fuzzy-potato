"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Define the API exposed to the renderer process
const electronAPI = {
    // Basic test
    ping: () => electron_1.ipcRenderer.invoke("ping"),
    // App information
    getAppVersion: () => electron_1.ipcRenderer.invoke("get-app-version"),
    getPlatform: () => process.platform,
    // Window controls
    minimizeWindow: () => electron_1.ipcRenderer.send("window-minimize"),
    maximizeWindow: () => electron_1.ipcRenderer.send("window-maximize"),
    closeWindow: () => electron_1.ipcRenderer.send("window-close"),
    // File system
    selectFile: () => electron_1.ipcRenderer.invoke("dialog-select-file"),
    readFile: (filePath) => electron_1.ipcRenderer.invoke("file-read", filePath),
    saveFile: (content, filename) => electron_1.ipcRenderer.invoke("file-save", content, filename),
    // Notifications
    showNotification: (title, body) => electron_1.ipcRenderer.send("show-notification", title, body),
    // System info
    getSystemInfo: () => electron_1.ipcRenderer.invoke("get-system-info"),
    // Email methods - properly typed
    email: {
        connect: (account) => {
            console.log("📧 preload: connect called with:", account);
            if (!account) {
                console.error("❌ preload: account is undefined!");
                return Promise.reject(new Error("Account is undefined"));
            }
            if (!account.email) {
                console.error("❌ preload: account.email is missing!", account);
                return Promise.reject(new Error("Account email is missing"));
            }
            return electron_1.ipcRenderer.invoke("email:connect", account);
        },
        fetch: (accountEmail, folder, limit) => electron_1.ipcRenderer.invoke("email:fetch", accountEmail, folder, limit),
        search: (accountEmail, criteria, folder) => electron_1.ipcRenderer.invoke("email:search", accountEmail, criteria, folder),
        send: (accountEmail, to, subject, body, html) => electron_1.ipcRenderer.invoke("email:send", accountEmail, to, subject, body, html),
        disconnect: (accountEmail) => electron_1.ipcRenderer.invoke("email:disconnect", accountEmail),
        folders: (accountEmail) => electron_1.ipcRenderer.invoke("email:folders", accountEmail),
    },
    // Event listeners
    on: (channel, callback) => {
        const validChannels = [
            "app-update-available",
            "app-update-downloaded",
            "app-download-progress",
            "menu-event",
        ];
        if (validChannels.includes(channel)) {
            const subscription = (_event, ...args) => callback(...args);
            electron_1.ipcRenderer.on(channel, subscription);
            // Return a cleanup function
            return () => {
                electron_1.ipcRenderer.removeListener(channel, subscription);
            };
        }
        return undefined;
    },
    // Remove listeners
    removeAllListeners: (channel) => {
        electron_1.ipcRenderer.removeAllListeners(channel);
    },
    // Send message to main process
    send: (channel, ...args) => {
        const validSendChannels = ["to-main-message", "app-log"];
        if (validSendChannels.includes(channel)) {
            electron_1.ipcRenderer.send(channel, ...args);
        }
    },
};
// Expose the API
electron_1.contextBridge.exposeInMainWorld("electron", electronAPI);
// Optional: Log that preload has loaded (for debugging)
console.log("✅ Electron preload script loaded");
// At the bottom of the file
console.log("✅ Electron API exposed with email methods");
