import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

// Define types for email account
interface EmailAccount {
  email: string;
  password: string;
  imapHost: string;
  imapPort: number;
  smtpHost: string;
  smtpPort: number;
}

// Define search criteria type (simplified)
type SearchCriteria = Record<string, unknown>;

// Define the API exposed to the renderer process
const electronAPI = {
  // Basic test
  ping: () => ipcRenderer.invoke("ping"),

  // App information
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
  getPlatform: () => process.platform,

  // Window controls
  minimizeWindow: () => ipcRenderer.send("window-minimize"),
  maximizeWindow: () => ipcRenderer.send("window-maximize"),
  closeWindow: () => ipcRenderer.send("window-close"),

  // File system
  selectFile: () => ipcRenderer.invoke("dialog-select-file"),
  readFile: (filePath: string) => ipcRenderer.invoke("file-read", filePath),
  saveFile: (content: string, filename: string) =>
    ipcRenderer.invoke("file-save", content, filename),

  // Notifications
  showNotification: (title: string, body: string) =>
    ipcRenderer.send("show-notification", title, body),

  // System info
  getSystemInfo: () => ipcRenderer.invoke("get-system-info"),

  // Email methods - properly typed
  email: {
    connect: (account: EmailAccount) => {
      console.log("📧 preload: connect called with:", account);
      if (!account) {
        console.error("❌ preload: account is undefined!");
        return Promise.reject(new Error("Account is undefined"));
      }
      if (!account.email) {
        console.error("❌ preload: account.email is missing!", account);
        return Promise.reject(new Error("Account email is missing"));
      }
      return ipcRenderer.invoke("email:connect", account);
    },
    fetch: (accountEmail: string, folder?: string, limit?: number) =>
      ipcRenderer.invoke("email:fetch", accountEmail, folder, limit),
    search: (accountEmail: string, criteria: SearchCriteria, folder?: string) =>
      ipcRenderer.invoke("email:search", accountEmail, criteria, folder),
    send: (
      accountEmail: string,
      to: string[],
      subject: string,
      body: string,
      html?: string,
    ) =>
      ipcRenderer.invoke("email:send", accountEmail, to, subject, body, html),
    disconnect: (accountEmail: string) =>
      ipcRenderer.invoke("email:disconnect", accountEmail),
    folders: (accountEmail: string) =>
      ipcRenderer.invoke("email:folders", accountEmail),
  },

  // Event listeners
  on: (channel: string, callback: (...args: unknown[]) => void) => {
    const validChannels = [
      "app-update-available",
      "app-update-downloaded",
      "app-download-progress",
      "menu-event",
    ] as const;

    if (validChannels.includes(channel as (typeof validChannels)[number])) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        callback(...args);
      ipcRenderer.on(channel, subscription);

      // Return a cleanup function
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    }
    return undefined;
  },

  // Remove listeners
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },

  // Send message to main process
  send: (channel: string, ...args: unknown[]) => {
    const validSendChannels = ["to-main-message", "app-log"] as const;
    if (
      validSendChannels.includes(channel as (typeof validSendChannels)[number])
    ) {
      ipcRenderer.send(channel, ...args);
    }
  },
};

// Expose the API
contextBridge.exposeInMainWorld("electron", electronAPI);

// Optional: Log that preload has loaded (for debugging)
console.log("✅ Electron preload script loaded");
// At the bottom of the file
console.log("✅ Electron API exposed with email methods");