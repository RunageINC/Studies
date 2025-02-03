import React from "react";

export const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      color: "var(--white)",
      width: "2.4rem",
      height: "2.4rem",
      cursor: "pointer",
    }}
  >
    {children}
  </div>
);
