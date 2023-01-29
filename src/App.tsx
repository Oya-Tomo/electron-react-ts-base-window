import React, { useState } from "react";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";

import style from "./App.module.scss";

const App: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  window.addEventListener("resize", () => {
    window.api.requestWindowSize();
  });
  window.api.handleResizeWindow((isMaximized) => {
    setIsMaximized(isMaximized);
  });
  return (
    <div className={style["app"]}>
      <div className={style["titlebar"]}>
        <div className={style["dragable-area"]}></div>
        <button
          onClick={() => {
            window.api.windowMinimize();
          }}
        >
          {<VscChromeMinimize />}
        </button>
        <button
          onClick={() => {
            window.api.windowResize();
          }}
        >
          {isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
        </button>
        <button
          onClick={() => {
            window.api.windowClose();
          }}
        >
          {<VscChromeClose />}
        </button>
      </div>
      <div className={style[""]}></div>
    </div>
  );
};

export default App;
