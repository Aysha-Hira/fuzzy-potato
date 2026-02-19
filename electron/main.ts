import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Notification,
  shell,
} from "electron";
import path from "path";
import fs from "fs/promises";
import os from "os";
import "./emailService";

let mainWindow: BrowserWindow | null = null;
const isDev = process.env.NODE_ENV === "development";

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
    frame: true, // Set to false if you want custom window controls
  });

  if (isDev) {
    await mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    await mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ========== IPC HANDLERS ==========

// Basic test
ipcMain.handle("ping", () => "pong");

// App version
ipcMain.handle("get-app-version", () => app.getVersion());

// Window controls
ipcMain.on("window-minimize", () => {
  mainWindow?.minimize();
});

ipcMain.on("window-maximize", () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.on("window-close", () => {
  mainWindow?.close();
});

ipcMain.handle("dialog-select-file", async () => {
  if (!mainWindow) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await dialog.showOpenDialog(mainWindow, {
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
ipcMain.handle("file-read", async (event, filePath: string) => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return { success: true, content };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});

// File save
ipcMain.handle(
  "file-save",
  async (event, content: string, filename: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await dialog.showSaveDialog(mainWindow!, {
        defaultPath: filename,
        filters: [
          { name: "Text Files", extensions: ["txt"] },
          { name: "All Files", extensions: ["*"] },
        ],
      });

      if (result.filePath) {
        await fs.writeFile(result.filePath, content, "utf-8");
        return { success: true, path: result.filePath };
      }
      return { success: false, error: "No file selected" };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  },
);

// Notifications
ipcMain.on("show-notification", (event, title: string, body: string) => {
  new Notification({ title, body }).show();
});

// System info
ipcMain.handle("get-system-info", () => {
  return {
    platform: process.platform,
    arch: process.arch,
    version: process.version,
    electronVersion: process.versions.electron,
    chromeVersion: process.versions.chrome,
    nodeVersion: process.versions.node,
    cpus: os.cpus().length,
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    homedir: os.homedir(),
    hostname: os.hostname(),
  };
});

// Handle external links
app.on("web-contents-created", (event, contents) => {
  contents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
});

// Optional: Auto-updater handlers (if you add electron-updater)
// ipcMain.handle('check-for-updates', () => { ... });
