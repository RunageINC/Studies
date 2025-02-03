import { Controller } from "../svgs/controller";

import "./index.css";

export type LogoProps = {
  size?: "normal" | "large";
  color?: "white" | "black";
  hideText?: boolean;
};

const Logo = ({
  color = "white",
  size = "normal",
  hideText = false,
}: LogoProps) => {
  return (
    <div
      className={`won-games__logo flex-row-center logo-text-${color} logo-${size}`}
    >
      <Controller />
      {!hideText && <h2>WON</h2>}
    </div>
  );
};

export default Logo;
