import React from "react";
import style from "./loadingBtn.module.css";
const LoadingBtn = () => {
  return (
    <button type="button" disabled className={style.buttonload}>
      <div className={`buttonSpinner ${style.buttonSpinner}`}></div>
    </button>
  );
};

export default LoadingBtn;
