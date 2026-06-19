import React, { forwardRef } from "react";
import styles from "./styles/Button.module.scss";

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { bType?: "text" | "icon" }
>(function Button({ children, bType = "text", ...otherProps }, ref) {
  return (
    <button
      ref={ref}
      {...otherProps}
      className={styles.button}
      data-type={bType}
    >
      {children}
    </button>
  );
});

export default Button;
