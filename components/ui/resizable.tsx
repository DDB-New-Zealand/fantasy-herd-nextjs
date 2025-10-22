"use client";

import {
  clamp,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "motion/react";
import * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ResizableContext = createContext<{
  sizes: MotionValue<[number, number]>;
  cursor: MotionValue<string>;
  onHandleDown: (e: PointerEvent) => void;
  onHandleMove: (e: PointerEvent) => void;
  onHandleUp: (e: PointerEvent) => void;
}>({
  sizes: new MotionValue([50, 50]),
  cursor: new MotionValue("grab"),
  onHandleDown: (e: PointerEvent) => {},
  onHandleMove: (e: PointerEvent) => {},
  onHandleUp: (e: PointerEvent) => {},
});

const useResizable = () => {
  return useContext(ResizableContext);
};

export const ResizablePanelGroup: React.FC<
  React.PropsWithChildren<{
    maxSize: [number | undefined, number | undefined];
    minSize: [number | undefined, number | undefined];
    defaultSize: [number | undefined, number | undefined];
  }>
> = ({ maxSize, minSize, defaultSize, children }) => {
  const [hasRendered, setHasRendered] = useState(false);

  const memoRef = useRef({
    maxSize,
    minSize,
    defaultSize,
  });

  const sizes = useMotionValue<[number, number]>([50, 50]);
  const cursor = useMotionValue("grab");

  const dataRef = useRef({
    isResizing: false,
    startX: 0,
    currentSize: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const resize = useCallback(
    (targetX: number) => {
      const container = containerRef.current;
      if (!container) return;

      const containerBox = container.getBoundingClientRect();

      let firstWidth = clamp(
        0,
        memoRef.current.maxSize[0] ?? Infinity,
        targetX,
      );

      if (
        firstWidth < (memoRef.current.minSize[0] ?? 0) / 2 ||
        (memoRef.current.minSize[0] ?? 0) + (memoRef.current.minSize[1] ?? 0) >
          containerBox.width
      ) {
        firstWidth = 0;
      } else if (
        containerBox.width - (memoRef.current.minSize[1] ?? 0) <
        firstWidth
      ) {
        firstWidth = containerBox.width - (memoRef.current.minSize[1] ?? 0);
      } else {
        firstWidth = clamp(
          memoRef.current.minSize[0] ?? 0,
          memoRef.current.maxSize[0] ?? Infinity,
          targetX,
        );
      }

      const firstX = (firstWidth / containerBox.width) * 100;

      dataRef.current.currentSize = firstWidth;

      sizes.set([firstX, 100 - firstX]);
    },
    [sizes],
  );

  useEffect(() => {
    resize(memoRef.current.defaultSize[0] ?? 0);

    const resizeHandler = () => {
      resize(dataRef.current.currentSize);
    };

    window.addEventListener("resize", resizeHandler);
    setHasRendered(true);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [resize]);

  return (
    <ResizableContext.Provider
      value={{
        sizes: sizes,
        cursor: cursor,
        onHandleDown: (e: PointerEvent) => {
          dataRef.current.isResizing = true;
          dataRef.current.startX = e.clientX;

          cursor.set("grabbing");
        },
        onHandleMove: (e: PointerEvent) => {
          if (!dataRef.current.isResizing) {
            return;
          }

          const container = containerRef.current;
          if (!container) return;

          const containerBox = container.getBoundingClientRect();

          resize(e.clientX - containerBox.x);
        },
        onHandleUp: (e: PointerEvent) => {
          dataRef.current.isResizing = false;

          cursor.set("grab");
        },
      }}
    >
      <div className="absolute inset-0 flex w-full h-full" ref={containerRef}>
        {hasRendered && children}
      </div>
    </ResizableContext.Provider>
  );
};

export const ResizablePanel: React.FC<
  React.PropsWithChildren<{
    index: number;
  }>
> = ({ index, children }) => {
  const { sizes } = useResizable();

  const width = useTransform(sizes, (value) => {
    return `${value[index]}%`;
  });

  return (
    <motion.div
      className="relative h-full w-1/2 overflow-hidden"
      style={{ width: width }}
    >
      {children}
    </motion.div>
  );
};

export const ResizableHandle: React.FC = () => {
  const { cursor, onHandleDown, onHandleMove, onHandleUp } = useResizable();

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
    <div className="relative h-full">
      <div className="absolute inset-y-6 left-1/2 -translate-x-1/2 border-r z-10">
        <motion.div
          ref={ref}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-[calc(50%-0.5px)] h-[46px] bg-background flex items-center justify-center gap-[2px] p-2 select-none"
          style={{
            cursor,
          }}
        >
          <div className="border-r h-6" />
          <div className="border-r h-6" />
        </motion.div>
      </div>
    </div>
  );
};
