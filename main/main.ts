import { BrowserWindow, app, ipcMain } from "electron";

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    titleBarStyle: "hidden",
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + "/preload.js",
    },
  });

  const appUrl = app.isPackaged
    ? `file://${__dirname}/../index.html`
    : "http://localhost:3000";

  mainWindow.loadURL(appUrl);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", () => {
  createWindow();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const IPCKeys = {
  WINDOW_CLOSE: "window-close",
  WINDOW_RESIZE: "windows-resize",
  WINDOW_MINIMIZE: "window-minimize",
  REQUEST_WINDOW_SIZE: "request-window-size",
  HANDLE_RISIZE_WINDOW: "handle-resize-window",
};

ipcMain.on(IPCKeys.WINDOW_CLOSE, (event) => {
  mainWindow?.close();
});

ipcMain.on(IPCKeys.WINDOW_RESIZE, (event) => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.on(IPCKeys.WINDOW_MINIMIZE, (event) => {
  mainWindow?.minimize();
});

ipcMain.on(IPCKeys.REQUEST_WINDOW_SIZE, (event) => {
  if (mainWindow?.isMaximized()) {
    event.sender.send(IPCKeys.HANDLE_RISIZE_WINDOW, "true");
  } else {
    event.sender.send(IPCKeys.HANDLE_RISIZE_WINDOW, "false");
  }
});
