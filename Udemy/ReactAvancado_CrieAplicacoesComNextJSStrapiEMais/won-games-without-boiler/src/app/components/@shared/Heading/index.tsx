import "./index.css";

export type HeadingProps = {
  children: React.ReactNode;
  size?: "l" | "xl";
  color?: "black" | "white";
  lineLeft?: boolean;
  lineBottom?: boolean;
};

const Heading = ({
  children,
  size = "l",
  color = "white",
  lineLeft = false,
  lineBottom = false,
}: HeadingProps) => {
  return (
    <h2
      className={`won-games__heading heading-${size} heading-${color} 
      ${lineLeft && "heading-line-left"} ${
        lineBottom && "heading-line-bottom"
      }`}
    >
      {children}
    </h2>
  );
};

export default Heading;
