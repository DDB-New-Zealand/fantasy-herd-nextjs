"use client";

import { Button } from "@/components/ui/button";
import { useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import CowToken from "./cow-token";
import MoolahToken from "./moolah-token";

const Page = () => {
  const rotation = useSpring(0, {
    bounce: 0.1,
  });
  const yOffset = useSpring(0, {
    bounce: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let hasClicked = false;
    let x = 0;
    let y = 0;

    const pointerDown = (event: PointerEvent) => {
      hasClicked = true;
      x = event.clientX;
      y = event.clientY;
    };

    const pointerMove = (event: PointerEvent) => {
      if (!hasClicked) return;

      const dx = event.clientX - x;
      const dy = event.clientY - y;
      rotation.set(rotation.get() + dx * 1);

      x = event.clientX;
      y = event.clientY;
    };

    const pointerUp = (event: PointerEvent) => {
      hasClicked = false;
      rotation.set(0);
    };

    container.addEventListener("pointerdown", pointerDown);
    container.addEventListener("pointermove", pointerMove);
    container.addEventListener("pointerup", pointerUp);

    return () => {
      container.removeEventListener("pointerdown", pointerDown);
      container.removeEventListener("pointermove", pointerMove);
      container.removeEventListener("pointerup", pointerUp);
    };
  }, [rotation]);

  return (
    <div className="grid grid-cols-12 h-svh relative">
      <div
        className="relative col-start-1 col-end-10 grid grid-cols-2 p-6"
        ref={containerRef}
      >
        <div className="relative perspective-near ">
          <CowToken rotation={rotation} highlighOffset={yOffset} />
        </div>
        <div className="relative perspective-near ">
          <MoolahToken rotation={rotation} highlighOffset={yOffset} />
        </div>
      </div>
      <div className="border-l border-black bg-white col-start-10 col-end-13 p-6">
        <Button
          onClick={() => {
            yOffset.jump(0);
            yOffset.set(1);
          }}
        >
          Shine
        </Button>
      </div>
    </div>
  );
};

export default Page;
