"use client";

import { useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Card from "./components/card";
import "./css/cards.css";
import "./css/cards/amazing-rare.css";
import "./css/cards/base.css";
import "./css/cards/basic.css";
import "./css/cards/cosmos-holo.css";
import "./css/cards/radiant-holo.css";
import "./css/cards/rainbow-alt.css";
import "./css/cards/rainbow-holo.css";
import "./css/cards/regular-holo.css";
import "./css/cards/reverse-holo.css";
import "./css/cards/secret-rare.css";
import "./css/cards/shiny-rare.css";
import "./css/cards/shiny-v.css";
import "./css/cards/shiny-vmax.css";
import "./css/cards/swsh-pikachu.css";
import "./css/cards/trainer-full-art.css";
import "./css/cards/trainer-gallery-holo.css";
import "./css/cards/trainer-gallery-secret-rare.css";
import "./css/cards/trainer-gallery-v-max.css";
import "./css/cards/trainer-gallery-v-regular.css";
import "./css/cards/v-full-art.css";
import "./css/cards/v-max.css";
import "./css/cards/v-regular.css";
import "./css/cards/v-star.css";

const width = 658 / 2;
const height = 1004 / 2;

const Page = () => {
  const frontFaceData = {
    faceUrl: `/api/card?v=${Math.random()}`,
    maskUrl: `/api/card?mask&v=${Math.random()}`,
    foilUrl: `/api/card?foil&v=${Math.random()}`,
  };

  const randomSeedX = useMotionValue(Math.random());
  const randomSeedY = useMotionValue(Math.random());

  const springGlare = {
    x: useSpring(50),
    y: useSpring(50),
    o: useSpring(0),
  };

  const springRotate = {
    x: useSpring(0),
    y: useSpring(0),
  };
  const springRotateDelta = {
    x: useSpring(0),
    y: useSpring(0),
  };

  const springBackground = {
    x: useSpring(50),
    y: useSpring(50),
  };

  const springTranslate = {
    x: useSpring(0),
    y: useSpring(0),
  };

  return (
    <div
      className="grid grid-cols-12 h-svh relative"
      style={{
        background: `
            radial-gradient(circle, rgba(136, 136, 136, 0.24) 1px, transparent 1px),
            var(--moss-green)
          `,
        backgroundSize: "8px 8px",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.20) 100%)",
        }}
      ></div>
      {frontFaceData && (
        <>
          <div className="relative col-span-4">
            <Card
              randomSeedX={randomSeedX}
              randomSeedY={randomSeedY}
              springGlareX={springGlare.x}
              springGlareY={springGlare.y}
              springGlareOpacity={springGlare.o}
              springRotateX={springRotate.x}
              springRotateY={springRotate.y}
              springRotateDeltaX={springRotateDelta.x}
              springRotateDeltaY={springRotateDelta.y}
              springBackgroundX={springBackground.x}
              springBackgroundY={springBackground.y}
              springTranslateX={springTranslate.x}
              springTranslateY={springTranslate.y}
              maskUrl={frontFaceData.maskUrl}
              foilUrl={frontFaceData.foilUrl}
              faceUrl={frontFaceData.faceUrl}
              width={width}
              height={height}
            />
          </div>
          <div className="col-span-8 bg-white grid grid-cols-3">
            <div className="flex flex-col items-center justify-center">
              <div>Face</div>
              <div className="relative">
                {/* <div
                  style={{
                    width,
                    height,
                    backgroundImage:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "40px 40px",
                    backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: "4.55%/3.5%",
                  }}
                /> */}
                <Image
                  className="relative"
                  src={frontFaceData?.faceUrl}
                  width={width}
                  height={height}
                  alt={""}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>Foil</div>
              <div className="relative">
                {/* <div
                  style={{
                    width,
                    height,
                    backgroundImage:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "40px 40px",
                    backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: "4.55%/3.5%",
                  }}
                /> */}
                <Image
                  className="relative"
                  src={frontFaceData?.foilUrl}
                  width={width}
                  height={height}
                  alt={""}
                  unoptimized
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>Mask</div>
              <div className="relative">
                <Image
                  className="relative"
                  src={frontFaceData?.maskUrl}
                  width={width}
                  height={height}
                  alt={""}
                  unoptimized
                  quality={100}
                />
              </div>
            </div>
            <div className="col-span-full">Settings</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
