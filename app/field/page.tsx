"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import dayjs from "dayjs";
import { animate } from "motion";
import {
  motion,
  MotionValue,
  transform,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FieldImage from "./fieldImage";
import { useFilteredImage, useFilterValues } from "./helper/filter-image";
import {
  getCloudTimeline,
  getFilterTimeline,
  getRadialGradient,
  getSunTimeline,
  sunAppearTime,
  sunDisappearTime,
} from "./helper/timeline";
import Cloud from "./images/clouds.png";
import Dither from "./images/dither.png";
import Sun from "./images/sun.png";
import Moon from "./images/moon.png";

const sunColor = "#FFF49D";

const clouds = [
  {
    offset: 100,
    speed: 1,
    x: 400,
    y: 150,
  },
  {
    offset: 700,
    speed: 0.5,
    x: 300,
    y: 140,
  },
  {
    offset: 400,
    speed: 0.65,
    x: 200,
    y: 180,
  },
  {
    offset: 250,
    speed: 0.8,
    x: 100,
    y: 130,
  },
];

const Page = () => {
  const [time, setTime] = useState(0);
  const [realTime, setRealTime] = useState(0);
  const [isRealTime, setIsRealTime] = useState(false);
  const [showDither, setShowDither] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const cloudContainerRef = useRef<HTMLDivElement>(null);

  const inGameTime = useMotionValue(0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTime(
        dayjs().hour() + dayjs().minute() / 60 + dayjs().second() / 60 / 60,
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isRealTime) {
      inGameTime.set(realTime);
    } else {
      inGameTime.set(time);
    }
  }, [time, realTime, isRealTime, inGameTime]);

  const radialGradientColors = useTransform(inGameTime, (value) => {
    return getRadialGradient(inGameTime.get());
  });
  const radialGradientColorBottom = useTransform(
    radialGradientColors,
    (value) => value.colorBottom || "#fff",
  );
  const radialGradientColorTop = useTransform(
    radialGradientColors,
    (value) => value.colorTop || "#fff",
  );

  const foregroundFilterValues = useFilterValues();
  const backgroundFilterValues = useFilterValues();

  const cloudOpacity = useMotionValue(0);
  const cloudFilterValues = useFilterValues();
  const cloudImage = useFilteredImage(Cloud.src, 250, 150, cloudFilterValues);

  const sunOpacity = useMotionValue(0);
  const sunAngle = useMotionValue(0);

  const sunX = useMotionValue(0);
  const sunY = useMotionValue(0);

  const moonX = useMotionValue(-100);
  const moonY = useMotionValue(-100);

  useMotionValueEvent(inGameTime, "change", () => {
    const filterTimeline = getFilterTimeline(inGameTime.get());
    if (filterTimeline) {
      foregroundFilterValues.exposure.set(filterTimeline.foreground.exposure);
      foregroundFilterValues.contrast.set(filterTimeline.foreground.contrast);
      foregroundFilterValues.saturation.set(
        filterTimeline.foreground.saturation,
      );
      foregroundFilterValues.temp.set(filterTimeline.foreground.temp);
      foregroundFilterValues.tint.set(filterTimeline.foreground.tint);
      backgroundFilterValues.exposure.set(filterTimeline.background.exposure);
      backgroundFilterValues.contrast.set(filterTimeline.background.contrast);
      backgroundFilterValues.saturation.set(
        filterTimeline.background.saturation,
      );
      backgroundFilterValues.temp.set(filterTimeline.background.temp);
      backgroundFilterValues.tint.set(filterTimeline.background.tint);
    }

    const cloudFilterTimeline = getCloudTimeline(inGameTime.get());
    if (cloudFilterTimeline) {
      cloudOpacity.set(cloudFilterTimeline.opacity);
      cloudFilterValues.exposure.set(cloudFilterTimeline.exposure);
      cloudFilterValues.contrast.set(cloudFilterTimeline.contrast);
      cloudFilterValues.saturation.set(cloudFilterTimeline.saturation);
      cloudFilterValues.temp.set(cloudFilterTimeline.temp);
      cloudFilterValues.tint.set(cloudFilterTimeline.tint);
    }

    const sunTimeline = getSunTimeline(inGameTime.get());
    if (sunTimeline) {
      sunOpacity.set(sunTimeline.opacity);
      sunAngle.set(sunTimeline.angle);
    }

    // const x = getSunTimeline(sunX.get());

    // const

    const area = areaRef.current;
    if (!area) return;

    const angle =
      ((inGameTime.get() - 6) / (sunDisappearTime - sunAppearTime)) *
        2 *
        Math.PI +
      Math.PI;
    const x = (area.clientWidth / 2) * 0.8;

    sunX.set(x * Math.cos(angle) + area.clientWidth / 2);

    console.log(angle);
    sunY.set(x * Math.sin(angle) + area.clientHeight / 2);
  });

  const cloud1X = useMotionValue(clouds[0].x || 0);
  const cloud1Y = useMotionValue(clouds[0].y || 0);

  const cloud2X = useMotionValue(clouds[1].x || 0);
  const cloud2Y = useMotionValue(clouds[1].y || 0);

  const cloud3X = useMotionValue(clouds[2].x || 0);
  const cloud3Y = useMotionValue(clouds[2].y || 0);

  const cloud4X = useMotionValue(clouds[3].x || 0);
  const cloud4Y = useMotionValue(clouds[3].y || 0);

  const updateCloud = (
    cloudSetting: {
      offset: number;
      speed: number;
      x: number;
      y: number;
    },
    x: MotionValue<number>,
    y: MotionValue<number>,
    transformer: (value: number) => number,
    time: number,
  ) => {
    const cloudContainer = cloudContainerRef.current;
    if (!cloudContainer) return;

    const originalX =
      ((time / 100) * cloudSetting.speed + cloudSetting.offset) %
      (cloudContainer.clientWidth + 250);

    const nextX = transformer(originalX);

    const shouldReset =
      x.get() > cloudContainer.clientWidth / 2 &&
      nextX < cloudContainer.clientWidth / 2;

    if (shouldReset) {
      const nextY = Math.random() * 100 + 100;
      y.set(nextY);
    }

    x.set(nextX);
  };

  useAnimationFrame((time) => {
    const cloudContainer = cloudContainerRef.current;
    if (!cloudContainer) return;

    updateCloud(
      clouds[0],
      cloud1X,
      cloud1Y,
      transform(
        [0, cloudContainer.clientWidth + 250],
        [-125, cloudContainer.clientWidth + 125],
      ),
      time,
    );

    updateCloud(
      clouds[1],
      cloud2X,
      cloud2Y,
      transform(
        [0, cloudContainer.clientWidth + 250],
        [-125, cloudContainer.clientWidth + 125],
      ),
      time,
    );

    updateCloud(
      clouds[2],
      cloud3X,
      cloud3Y,
      transform(
        [0, cloudContainer.clientWidth + 250],
        [-125, cloudContainer.clientWidth + 125],
      ),
      time,
    );

    updateCloud(
      clouds[3],
      cloud4X,
      cloud4Y,
      transform(
        [0, cloudContainer.clientWidth + 250],
        [-125, cloudContainer.clientWidth + 125],
      ),
      time,
    );
  });

  return (
    <div className="grid grid-cols-12 h-svh relative">
      <div
        className="relative col-start-1 col-end-10 grid grid-cols-2 p-6 pointer-events-none"
        ref={containerRef}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-1/2 w-[900px] h-[660px] overflow-hidden"
          ref={areaRef}
        >
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-0 -left-full -right-full h-[292px]"
              style={{
                imageRendering: "pixelated",
                background: useMotionTemplate`radial-gradient(ellipse farthest-side at bottom, ${radialGradientColorBottom}, ${radialGradientColorTop})`,
              }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-[500px] "
                style={{
                  imageRendering: "pixelated",
                  rotate: sunAngle,
                  opacity: sunOpacity,
                  background: `radial-gradient(ellipse farthest-side at 40% 75%, ${sunColor}, transparent)`,
                }}
              ></motion.div>
            </motion.div>

            <motion.div
              className="absolute top-0 left-0 z-10"
              style={{
                x: sunX,
                y: sunY,
              }}
            >
              <Image
                className="absolute top-1/2 left-1/2 -translate-1/2 max-w-none w-[78px] h-[78px] object"
                src={Sun}
                width={78}
                height={78}
                alt={""}
              />
            </motion.div>

            <motion.div
              className="absolute top-0 left-0"
              style={{
                x: moonX,
                y: moonY,
              }}
            >
              <Image
                className="absolute top-1/2 left-1/2 -translate-1/2 max-w-none w-[78px] h-[78px] object"
                src={Moon}
                width={78}
                height={78}
                alt={""}
              />
            </motion.div>

            {cloudImage && (
              <motion.div
                className="absolute inset-0 overflow-hidden"
                ref={cloudContainerRef}
                style={{
                  opacity: cloudOpacity,
                }}
              >
                <motion.div
                  className="absolute top-0 left-0"
                  style={{
                    x: cloud1X,
                    y: cloud1Y,
                  }}
                >
                  <Image
                    className="absolute top-1/2 left-1/2 -translate-1/2 max-w-none w-[250px] h-[50px] object-top object-none"
                    src={cloudImage}
                    width={250}
                    height={50}
                    alt={""}
                  />
                </motion.div>

                <motion.div
                  className="absolute top-0 left-0"
                  style={{
                    x: cloud2X,
                    y: cloud2Y,
                  }}
                >
                  <Image
                    className="absolute top-1/2 left-1/2 -translate-1/2 max-w-none w-[250px] h-[50px] object-[0%_50%] object-none"
                    src={cloudImage}
                    width={250}
                    height={50}
                    alt={""}
                  />
                </motion.div>

                <motion.div
                  className="absolute top-0 left-0"
                  style={{
                    x: cloud3X,
                    y: cloud3Y,
                  }}
                >
                  <Image
                    className="absolute top-1/2 left-1/2 -translate-1/2 max-w-none w-[250px] h-[50px] object-[0%_100%] object-none"
                    src={cloudImage}
                    width={250}
                    height={50}
                    alt={""}
                  />
                </motion.div>

                <motion.div
                  className="absolute top-0 left-0"
                  style={{
                    x: cloud4X,
                    y: cloud4Y,
                  }}
                >
                  <Image
                    className="absolute top-1/2 left-1/2 -translate-1/2 max-w-none w-[250px] h-[50px] object-[0%_100%] object-none"
                    src={cloudImage}
                    width={250}
                    height={50}
                    alt={""}
                  />
                </motion.div>
              </motion.div>
            )}

            {showDither && (
              <motion.div
                className="absolute top-0 left-0 right-0 opacity-15 h-[750px] -translate-y-[88px]"
                style={{
                  backgroundImage: `url(${Dither.src})`,
                  mixBlendMode: "darken",
                  backgroundRepeat: "repeat-x",
                  backgroundSize: "auto 50%",
                  backgroundPosition: "center 0%",
                }}
              ></motion.div>
            )}
          </div>
          <motion.div className="absolute inset-0" style={{}}>
            <motion.div className="absolute inset-0">
              <FieldImage
                exposure={backgroundFilterValues.exposure}
                contrast={backgroundFilterValues.contrast}
                saturation={backgroundFilterValues.saturation}
                temp={backgroundFilterValues.temp}
                tint={backgroundFilterValues.tint}
              />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              style={{
                maskImage: `radial-gradient(ellipse farthest-side at 50% 40%, #fff, #000)`,
                maskMode: "luminance",
              }}
            >
              <FieldImage
                exposure={foregroundFilterValues.exposure}
                contrast={foregroundFilterValues.contrast}
                saturation={foregroundFilterValues.saturation}
                temp={foregroundFilterValues.temp}
                tint={foregroundFilterValues.tint}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="border-l border-black bg-white col-start-10 col-end-13 p-6">
        <div className="flex flex-col">
          <Slider
            min={0}
            max={24}
            onValueChange={(value) => {
              setTime(value[0]);
            }}
            step={0.001}
            value={[time]}
          />
          <div className="flex justify-between">
            <div>0</div>
            <div>24</div>
          </div>
        </div>
        <div>Selected time: {time}</div>
        <div>Real time: {realTime.toFixed(3)} hr</div>
        <div className="">
          use real time
          <Switch
            checked={isRealTime}
            onCheckedChange={(value) => {
              setIsRealTime(value);
            }}
          />
        </div>
        <div>
          Show Dithers
          <Switch
            checked={showDither}
            onCheckedChange={(value) => {
              setShowDither(value);
            }}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              animate(0, 24, {
                duration: 60,
                onUpdate: (value) => setTime(value),
              });
            }}
          >
            Simulate
          </Button>
        </div>

        <hr className="my-4" />

        <div>Foreground Filters</div>

        <div className="flex flex-col">
          <div className="">Exposure</div>
          <div className="flex gap-3 mt-2">
            <div>{foregroundFilterValues.filterValues.exposure.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   //   setForegroundState({ ...foregroundState, exposure: value[0] });
                // }}
                step={0.001}
                value={[foregroundFilterValues.filterValues.exposure]}
                disabled
              />
              <div className="flex justify-between">
                <div>0</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Contrast</div>
          <div className="flex gap-3 mt-2">
            <div>{foregroundFilterValues.filterValues.contrast.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   foregroundContrast.set(value[0]);
                // }}
                step={0.001}
                value={[foregroundFilterValues.filterValues.contrast]}
                disabled
              />
              <div className="flex justify-between">
                <div>0</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Saturation</div>
          <div className="flex gap-3 mt-2">
            <div>
              {foregroundFilterValues.filterValues.saturation.toFixed(3)}
            </div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   foregroundSaturation.set(value[0]);
                // }}
                step={0.001}
                value={[foregroundFilterValues.filterValues.saturation]}
                disabled
              />
              <div className="flex justify-between">
                <div>0</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Temp</div>
          <div className="flex gap-3 mt-2">
            <div>{foregroundFilterValues.filterValues.temp.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={-1}
                max={1}
                // onValueChange={(value) => {
                //   foregroundTemp.set(value[0]);
                // }}
                step={0.001}
                value={[foregroundFilterValues.filterValues.temp]}
                disabled
              />
              <div className="flex justify-between">
                <div>-1</div>
                <div>1</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Tint</div>
          <div className="flex gap-3 mt-2">
            <div>{foregroundFilterValues.filterValues.tint.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={-1}
                max={1}
                // onValueChange={(value) => {
                //   foregroundTint.set(value[0]);
                // }}
                step={0.001}
                value={[foregroundFilterValues.filterValues.tint]}
                disabled
              />
              <div className="flex justify-between">
                <div>-1</div>
                <div>1</div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                JSON.stringify(foregroundFilterValues.filterValues),
              );
            }}
          >
            Copy
          </Button>
        </div>

        <hr className="my-4" />

        <div>Background Filters</div>

        <div className="flex flex-col">
          <div className="">Exposure</div>
          <div className="flex gap-3 mt-2">
            <div>{backgroundFilterValues.filterValues.exposure.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   backgroundExposure.set(value[0]);
                // }}
                step={0.001}
                value={[backgroundFilterValues.filterValues.exposure]}
                disabled
              />
              <div className="flex justify-between">
                <div>0</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Contrast</div>
          <div className="flex gap-3 mt-2">
            <div>{backgroundFilterValues.filterValues.contrast.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   backgroundContrast.set(value[0]);
                // }}
                step={0.001}
                value={[backgroundFilterValues.filterValues.contrast]}
                disabled
              />
              <div className="flex justify-between">
                <div>0</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Saturation</div>
          <div className="flex gap-3 mt-2">
            <div>
              {backgroundFilterValues.filterValues.saturation.toFixed(3)}
            </div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   backgroundSaturation.set(value[0]);
                // }}
                step={0.001}
                value={[backgroundFilterValues.filterValues.saturation]}
                disabled
              />
              <div className="flex justify-between">
                <div>0</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Temp</div>
          <div className="flex gap-3 mt-2">
            <div>{backgroundFilterValues.filterValues.temp.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={-1}
                max={1}
                // onValueChange={(value) => {
                //   backgroundTemp.set(value[0]);
                // }}
                step={0.001}
                value={[backgroundFilterValues.filterValues.temp]}
                disabled
              />
              <div className="flex justify-between">
                <div>-1</div>
                <div>1</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Tint</div>
          <div className="flex gap-3 mt-2">
            <div>{backgroundFilterValues.filterValues.tint.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={-1}
                max={1}
                // onValueChange={(value) => {
                //   setBackgroundState({ ...backgroundState, tint: value[0] });
                // }}
                step={0.001}
                value={[backgroundFilterValues.filterValues.tint]}
                disabled
              />
              <div className="flex justify-between">
                <div>-1</div>
                <div>1</div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                JSON.stringify(backgroundFilterValues.filterValues),
              );
            }}
          >
            Copy
          </Button>
        </div>

        <hr className="my-4" />

        <div>Cloud Filters</div>

        <div className="flex flex-col">
          <div className="">Exposure</div>
          <div className="flex gap-3 mt-2">
            <div>{cloudFilterValues.filterValues.exposure.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   cloudFilterValues.exposure.set(value[0]);
                // }}
                step={0.001}
                value={[cloudFilterValues.filterValues.exposure]}
                disabled
              />
              <div className="flex justify-between">
                <div>0</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Contrast</div>
          <div className="flex gap-3 mt-2">
            <div>{cloudFilterValues.filterValues.contrast.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   cloudFilterValues.contrast.set(value[0]);
                // }}
                step={0.001}
                value={[cloudFilterValues.filterValues.contrast]}
                disabled
              />
              <div className="flex justify-between">
                <div>0</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Saturation</div>
          <div className="flex gap-3 mt-2">
            <div>{cloudFilterValues.filterValues.saturation.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   cloudFilterValues.saturation.set(value[0]);
                // }}
                step={0.001}
                value={[cloudFilterValues.filterValues.saturation]}
                disabled
              />
              <div className="flex justify-between">
                <div>0</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Temp</div>
          <div className="flex gap-3 mt-2">
            <div>{cloudFilterValues.filterValues.temp.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={-1}
                max={1}
                // onValueChange={(value) => {
                //   cloudFilterValues.temp.set(value[0]);
                // }}
                step={0.001}
                value={[cloudFilterValues.filterValues.temp]}
                disabled
              />
              <div className="flex justify-between">
                <div>-1</div>
                <div>1</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">Tint</div>
          <div className="flex gap-3 mt-2">
            <div>{cloudFilterValues.filterValues.tint.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={-1}
                max={1}
                // onValueChange={(value) => {
                //   cloudFilterValues.tint.set(value[0]);
                // }}
                step={0.001}
                value={[cloudFilterValues.filterValues.tint]}
                disabled
              />
              <div className="flex justify-between">
                <div>-1</div>
                <div>1</div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                JSON.stringify(cloudFilterValues.filterValues),
              );
            }}
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
