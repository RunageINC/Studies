import React, { JSX } from "react";

import "./index.css";

export type ButtonProps = {
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  icon?: JSX.Element;
  onClick?: () => (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
  children,
  size = "medium",
  fullWidth = false,
  icon,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={`won-games__button button-${size} ${
      fullWidth ? "full-width" : ""
    } ${icon && "button-icon"}`}
  >
    {!!icon && icon}
    {!!children && <span>{children}</span>}
  </button>
);

export default Button;
