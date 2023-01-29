import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const IPCKeys = {
  WINDOW_CLOSE: "window-close",
  WINDOW_RESIZE: "windows-resize",
  WINDOW_MINIMIZE: "window-minimize",
  REQUEST_WINDOW_SIZE: "request-window-size",
  HANDLE_RISIZE_WINDOW: "handle-resize-window",
};

contextBridge.exposeInMainWorld("api", {
  windowClose: () => {
    ipcRenderer.send(IPCKeys.WINDOW_CLOSE);
  },
  windowResize: () => {
    ipcRenderer.send(IPCKeys.WINDOW_RESIZE);
  },
  windowMinimize: () => {
    ipcRenderer.send(IPCKeys.WINDOW_MINIMIZE);
  },
  requestWindowSize: () => {
    ipcRenderer.send(IPCKeys.REQUEST_WINDOW_SIZE);
  },
  handleResizeWindow: (listener: (isMaximized: boolean) => void) => {
    ipcRenderer.on(
      IPCKeys.HANDLE_RISIZE_WINDOW,
      (event: IpcRendererEvent, message: string) => {
        if (message == "true") {
          listener(true);
        } else {
          listener(false);
        }
      }
    );
    return () => {
      ipcRenderer.removeAllListeners(IPCKeys.HANDLE_RISIZE_WINDOW);
    };
  },
});
