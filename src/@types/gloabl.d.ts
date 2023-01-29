const IPCKeys = {
  WINDOW_CLOSE: "window-close",
  WINDOW_RESIZE: "windows-resize",
  WINDOW_MINIMIZE: "window-minimize",
  REQUEST_WINDOW_SIZE: "request-window-size",
  HANDLE_RISIZE_WINDOW: "handle-resize-window",
};

declare global {
  interface Window {
    api: API;
  }
}

export interface API {
  windowClose: () => void;
  windowMinimize: () => void;
  windowResize: () => void;
  requestWindowSize: () => void;
  handleResizeWindow: (listener: (isMaximized: boolean) => void) => () => void;
}
