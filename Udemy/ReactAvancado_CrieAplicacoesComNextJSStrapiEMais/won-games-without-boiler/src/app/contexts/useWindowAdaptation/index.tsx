"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

type WindowAdaptationContextData = {
  isMobile: boolean;
};

const WindowAdaptationContext = createContext(
  {} as WindowAdaptationContextData
);

export const WindowAdaptationProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { width } = useWindowSize();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(width! < 768);
  }, [width]);

  return (
    <WindowAdaptationContext.Provider value={{ isMobile }}>
      {children}
    </WindowAdaptationContext.Provider>
  );
};

export const useWindowAdaptation = () => useContext(WindowAdaptationContext);
