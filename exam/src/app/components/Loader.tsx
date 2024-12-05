import React from "react";
import styles from "./loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className="fixed w-full h-full">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
