"use client";

import * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type PanelData = {
  defaultSizes: number;
  minSize?: number;
  maxSize?: number;
};

const ResizableContext = createContext({
  sizes: [0, 0],
  registerPanel: (
    index: number,
    defaultSize: number,
    minSize?: number,
    maxSize?: number,
  ) => {},
  onHandleDown: (e: PointerEvent) => {},
  onHandleMove: (e: PointerEvent) => {},
  onHandleUp: (e: PointerEvent) => {},
});

const useResizable = () => {
  return useContext(ResizableContext);
};

export const ResizablePanelGroup: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [sizes, setSizes] = useState([50, 50]);
  const [panelData, setPanelData] = useState<PanelData[]>([
    {
      defaultSizes: 50,
      minSize: undefined,
      maxSize: undefined,
    },
    {
      defaultSizes: 50,
      minSize: undefined,
      maxSize: undefined,
    },
  ]);

  const dataRef = useRef({
    isResizing: false,
    startX: 0,
    startSizes: [50, 50],
    currentSizes: [50, 50],
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const registerPanel = useCallback(
    (
      index: number,
      defaultSize: number,
      minSize?: number,
      maxSize?: number,
    ) => {
      setPanelData((prev) => {
        const newData = [...prev];

        newData[index] = { defaultSizes: defaultSize, minSize, maxSize };

        return newData;
      });
    },
    [],
  );

  useEffect(() => {
    // const totalDefaultSize = panelData.reduce(
    //   (acc, panel) => acc + panel.defaultSizes,
    //   0,
    // );

    if (!containerRef.current) return;

    const firstPanel = panelData[0];
    const secondPanel = panelData[1];

    let firstPanelWidth = 0;
    let secondPanelWidth = 0;

    let width = containerRef.current.clientWidth;

    if (firstPanel.minSize) {
      firstPanelWidth = firstPanel.minSize;
      width -= firstPanelWidth;
    }

    if (secondPanel.minSize) {
      secondPanelWidth = secondPanel.minSize;
      width -= secondPanelWidth;
    }

    if (width < 0) {
    }
    // firstPanel.defaultSizes

    // setSizes();
  }, [panelData]);

  return (
    <ResizableContext.Provider
      value={{
        sizes,
        registerPanel,
        onHandleDown: (e: PointerEvent) => {
          console.log("down");

          dataRef.current.isResizing = true;
          dataRef.current.startX = e.clientX;
          dataRef.current.startSizes = sizes;
        },
        onHandleMove: (e: PointerEvent) => {
          if (!dataRef.current.isResizing || !containerRef.current) {
            return;
          }
          console.log("move");

          const containerBox = containerRef.current.getBoundingClientRect();

          const firstX =
            ((e.clientX - containerBox.x) / containerBox.width) * 100;

          dataRef.current.currentSizes[0] = firstX;
          dataRef.current.currentSizes[1] = 100 - firstX;

          // const newSize1 = dataRef.current.startSizes[0] + deltaRatio * 100;
          // const newSize2 = dataRef.current.startSizes[1] - deltaRatio * 100;

          setSizes([
            dataRef.current.currentSizes[0],
            dataRef.current.currentSizes[1],
          ]);
        },
        onHandleUp: (e: PointerEvent) => {
          console.log("up");

          // console.log(newSize1, newSize2);

          dataRef.current.isResizing = false;
        },
      }}
    >
      <div className="flex w-full h-full" ref={containerRef}>
        {children}
      </div>
    </ResizableContext.Provider>
  );
};

export const ResizablePanel: React.FC<
  React.PropsWithChildren<{
    index: number;
    defaultSize: number;
    minSize?: number;
    maxSize?: number;
  }>
> = ({ index, defaultSize, minSize, maxSize, children }) => {
  const { sizes, registerPanel } = useResizable();

  useEffect(() => {
    registerPanel(index, defaultSize, minSize, maxSize);
  }, [registerPanel, defaultSize, minSize, maxSize, index]);

  return (
    <div
      className="relative h-full w-1/2"
      style={{ width: `${sizes[index]}%` }}
    >
      {children}
    </div>
  );
};

export const ResizableHandle: React.FC = () => {
  const { onHandleDown, onHandleMove, onHandleUp } = useResizable();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("pointerdown", onHandleDown);
    window.addEventListener("pointermove", onHandleMove);
    window.addEventListener("pointerup", onHandleUp);

    return () => {
      element.removeEventListener("pointerdown", onHandleDown);
      window.removeEventListener("pointermove", onHandleMove);
      window.removeEventListener("pointerup", onHandleUp);
    };
  }, [onHandleDown, onHandleMove, onHandleUp]);

  return (
    <div className="relative h-full border-r">
      <div
        ref={ref}
        className="w-5 absolute inset-y-0 left-1/2 -translate-x-1/2 bg-green-400"
      >
        {/* <GripVerticalIcon /> */}
      </div>
    </div>
  );
};
