"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import dayjs from "dayjs";
import {
  cubicBezier,
  motion,
  transform,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import FieldImage, { useFieldImageFilterValues } from "./fieldImage";
import { animate } from "motion";

type TimelineState = {
  time: [number, number];
  colors: [string, string];
  foreground: {
    exposure: number;
    contrast: number;
    saturation: number;
    temp: number;
    tint: number;
  };
  background: {
    exposure: number;
    contrast: number;
    saturation: number;
    temp: number;
    tint: number;
  };
};

const timeline: TimelineState[] = [
  {
    time: [0, 6],
    colors: ["#244669", "#132537"],
    foreground: {
      exposure: 0.446,
      contrast: 1.562,
      saturation: 0.592,
      temp: -1,
      tint: 1,
    },
    background: {
      exposure: 0.446,
      contrast: 1.562,
      saturation: 0.592,
      temp: -1,
      tint: 1,
    },
  },
  {
    time: [6, 7],
    colors: ["#C8DEEB", "#3D70B5"],
    foreground: {
      exposure: 0.85,
      contrast: 1,
      saturation: 0.725,
      temp: -0.814,
      tint: 0.343,
    },
    background: {
      exposure: 0.519,
      contrast: 1.509,
      saturation: 0.793,
      temp: -0.589,
      tint: 0.611,
    },
  },
  {
    time: [7, 7.5],
    colors: ["#74ECFA", "#74ECFA"],
    foreground: { exposure: 1, contrast: 1, saturation: 1, temp: 0, tint: 0 },
    background: {
      exposure: 0.901,
      contrast: 1,
      saturation: 0.915,
      temp: 0.143,
      tint: 0,
    },
  },
  {
    time: [7.5, 19],
    colors: ["#BDF8FF", "#5ED5EB"],
    foreground: {
      exposure: 1,
      contrast: 1,
      saturation: 1,
      temp: 0.157,
      tint: 0,
    },
    background: {
      exposure: 1,
      contrast: 1,
      saturation: 1,
      temp: 0.157,
      tint: 0,
    },
  },
  {
    time: [19, 19.5],
    colors: ["#FE7BAB", "#FE7BAB"],
    foreground: {
      exposure: 1.585,
      contrast: 0.613,
      saturation: 0.626,
      temp: 1,
      tint: -0.14,
    },
    background: {
      exposure: 0.872,
      contrast: 1,
      saturation: 0.895,
      temp: 0.153,
      tint: 0,
    },
  },
  {
    time: [19.5, 20.5],
    colors: ["#CBB2F3", "#326A97"],
    foreground: {
      exposure: 1.086,
      contrast: 1.003,
      saturation: 0.627,
      temp: -0.648,
      tint: 0.377,
    },
    background: {
      exposure: 0.629,
      contrast: 1.228,
      saturation: 0.638,
      temp: -0.115,
      tint: 0.431,
    },
  },
  {
    time: [20.5, 21.5],
    colors: ["#244669", "#1B2D42"],
    foreground: {
      exposure: 0.62,
      contrast: 1.286,
      saturation: 0.586,
      temp: -0.843,
      tint: 0.709,
    },
    background: {
      exposure: 0.439,
      contrast: 1.464,
      saturation: 0.57,
      temp: -1,
      tint: 0.9,
    },
  },
  {
    time: [21.5, 24],
    colors: ["#244669", "#132537"],
    foreground: {
      exposure: 0.446,
      contrast: 1.562,
      saturation: 0.592,
      temp: -1,
      tint: 1,
    },
    background: {
      exposure: 0.446,
      contrast: 1.562,
      saturation: 0.592,
      temp: -1,
      tint: 1,
    },
  },
];

type RadialGradientTimelineState = {
  time: [number, number];
  transformer1: (value: number) => string;
  transformer2: (value: number) => string;
};

const radialGradientTimeline = timeline.reduce<RadialGradientTimelineState[]>(
  (prev, curr) => {
    if (prev.length === 0) {
      return [
        {
          time: curr.time,
          transformer1: () => curr.colors[0],
          transformer2: () => curr.colors[1],
        },
      ];
    }

    const prevItem: RadialGradientTimelineState = {
      ...prev[prev.length - 1],
      time: [prev[prev.length - 1].time[0], prev[prev.length - 1].time[1]],
    };
    const currItem: TimelineState = {
      ...curr,
      time: [curr.time[0], curr.time[1]],
    };
    prevItem.time[1] -= 0.2;
    currItem.time[0] += 0.2;

    const intermediateItem: RadialGradientTimelineState = {
      time: [prevItem.time[1], currItem.time[0]],
      transformer1: (value) =>
        transform(
          value,
          [prevItem.time[1], currItem.time[0]],
          [prevItem.transformer1(prevItem.time[1]), currItem.colors[0]],
          {
            ease: cubicBezier(0.3, 0, 0.2, 1),
          },
        ),
      transformer2: (value) =>
        transform(
          value,
          [prevItem.time[1], currItem.time[0]],
          [prevItem.transformer2(prevItem.time[1]), currItem.colors[1]],
          {
            ease: cubicBezier(0.3, 0, 0.2, 1),
          },
        ),
    };

    const rest = prev.slice(0, prev.length - 1);

    return [
      ...rest,
      prevItem,
      intermediateItem,
      {
        time: currItem.time,
        transformer1: () => currItem.colors[0],
        transformer2: () => currItem.colors[1],
      },
    ];
  },
  [],
);

const getRadialGradient = (time: number) => {
  const transformer = radialGradientTimeline.find(
    (transformer) => time >= transformer.time[0] && time <= transformer.time[1],
  );

  return {
    colorBottom: transformer?.transformer1(time),
    colorTop: transformer?.transformer2(time),
  };
};

type FiltersTimelineState = {
  time: [number, number];
  transformers: (value: number) => {
    foreground: {
      exposure: number;
      contrast: number;
      saturation: number;
      temp: number;
      tint: number;
    };
    background: {
      exposure: number;
      contrast: number;
      saturation: number;
      temp: number;
      tint: number;
    };
  };
};

const filterTimeline = timeline.reduce<FiltersTimelineState[]>((prev, curr) => {
  if (prev.length === 0) {
    return [
      {
        time: curr.time,
        transformers: () => {
          return {
            foreground: curr.foreground,
            background: curr.background,
          };
        },
      },
    ];
  }

  const prevItem: FiltersTimelineState = {
    ...prev[prev.length - 1],
    time: [prev[prev.length - 1].time[0], prev[prev.length - 1].time[1]],
  };
  const currItem: TimelineState = {
    ...curr,
    time: [curr.time[0], curr.time[1]],
  };
  prevItem.time[1] -= 0.2;
  currItem.time[0] += 0.2;

  const intermediatePeriod: FiltersTimelineState["time"] = [
    prevItem.time[1],
    currItem.time[0],
  ];

  const intermediateItem: FiltersTimelineState = {
    time: intermediatePeriod,
    transformers: (value: number) => {
      return {
        foreground: {
          exposure: transform(
            value,
            intermediatePeriod,
            [
              prevItem.transformers(prevItem.time[1]).foreground.exposure,
              currItem.foreground.exposure,
            ],
            {
              ease: cubicBezier(0.3, 0, 0.2, 1),
            },
          ),
          contrast: transform(
            value,
            intermediatePeriod,
            [
              prevItem.transformers(prevItem.time[1]).foreground.contrast,
              currItem.foreground.contrast,
            ],
            {
              ease: cubicBezier(0.3, 0, 0.2, 1),
            },
          ),
          saturation: transform(
            value,
            intermediatePeriod,
            [
              prevItem.transformers(prevItem.time[1]).foreground.saturation,
              currItem.foreground.saturation,
            ],
            {
              ease: cubicBezier(0.3, 0, 0.2, 1),
            },
          ),
          temp: transform(
            value,
            intermediatePeriod,
            [
              prevItem.transformers(prevItem.time[1]).foreground.temp,
              currItem.foreground.temp,
            ],
            {
              ease: cubicBezier(0.3, 0, 0.2, 1),
            },
          ),
          tint: transform(
            value,
            intermediatePeriod,
            [
              prevItem.transformers(prevItem.time[1]).foreground.tint,
              currItem.foreground.tint,
            ],
            {
              ease: cubicBezier(0.3, 0, 0.2, 1),
            },
          ),
        },
        background: {
          exposure: transform(
            value,
            intermediatePeriod,
            [
              prevItem.transformers(prevItem.time[1]).background.exposure,
              currItem.background.exposure,
            ],
            {
              ease: cubicBezier(0.3, 0, 0.2, 1),
            },
          ),
          contrast: transform(
            value,
            intermediatePeriod,
            [
              prevItem.transformers(prevItem.time[1]).background.contrast,
              currItem.background.contrast,
            ],
            {
              ease: cubicBezier(0.3, 0, 0.2, 1),
            },
          ),
          saturation: transform(
            value,
            intermediatePeriod,
            [
              prevItem.transformers(prevItem.time[1]).background.saturation,
              currItem.background.saturation,
            ],
            {
              ease: cubicBezier(0.3, 0, 0.2, 1),
            },
          ),
          temp: transform(
            value,
            intermediatePeriod,
            [
              prevItem.transformers(prevItem.time[1]).background.temp,
              currItem.background.temp,
            ],
            {
              ease: cubicBezier(0.3, 0, 0.2, 1),
            },
          ),
          tint: transform(
            value,
            intermediatePeriod,
            [
              prevItem.transformers(prevItem.time[1]).background.tint,
              currItem.background.tint,
            ],
            {
              ease: cubicBezier(0.3, 0, 0.2, 1),
            },
          ),
        },
      };
    },
  };

  const rest = prev.slice(0, prev.length - 1);

  return [
    ...rest,
    prevItem,
    intermediateItem,
    {
      time: currItem.time,
      transformers: () => ({
        foreground: currItem.foreground,
        background: currItem.background,
      }),
    },
  ];
}, []);

const getFilterTimeline = (time: number) => {
  const transformer = filterTimeline.find(
    (transformer) => time >= transformer.time[0] && time <= transformer.time[1],
  );

  return transformer?.transformers(time);
};

const sunColor = "#FFF49D";

const Page = () => {
  const [time, setTime] = useState(0);
  const [realTime, setRealTime] = useState(0);
  const [isRealTime, setIsRealTime] = useState(false);
  const [foregroundState, setForegroundState] = useState(
    getFilterTimeline(0)?.foreground || {
      exposure: 1,
      contrast: 1,
      saturation: 1,
      temp: 0,
      tint: 0,
    },
  );
  const [backgroundState, setBackgroundState] = useState(
    getFilterTimeline(0)?.background || {
      exposure: 1,
      contrast: 1,
      saturation: 1,
      temp: 0,
      tint: 0,
    },
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const inGameTime = useMotionValue(0);

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

  const filterValuesBackgroundExposure = useTransform(inGameTime, (value) => {
    return getFilterTimeline(value)?.background.exposure || 1;
  });
  const filterValuesBackgroundContrast = useTransform(inGameTime, (value) => {
    return getFilterTimeline(value)?.background.contrast || 1;
  });
  const filterValuesBackgroundSaturation = useTransform(inGameTime, (value) => {
    return getFilterTimeline(value)?.background.saturation || 1;
  });
  const filterValuesBackgroundTemp = useTransform(inGameTime, (value) => {
    return getFilterTimeline(value)?.background.temp || 0;
  });
  const filterValuesBackgroundTint = useTransform(inGameTime, (value) => {
    return getFilterTimeline(value)?.background.tint || 0;
  });

  const filterValuesForegroundExposure = useTransform(inGameTime, (value) => {
    return getFilterTimeline(value)?.foreground.exposure || 1;
  });
  const filterValuesForegroundContrast = useTransform(inGameTime, (value) => {
    return getFilterTimeline(value)?.foreground.contrast || 1;
  });
  const filterValuesForegroundSaturation = useTransform(inGameTime, (value) => {
    return getFilterTimeline(value)?.foreground.saturation || 1;
  });
  const filterValuesForegroundTemp = useTransform(inGameTime, (value) => {
    return getFilterTimeline(value)?.foreground.temp || 0;
  });
  const filterValuesForegroundTint = useTransform(inGameTime, (value) => {
    return getFilterTimeline(value)?.foreground.tint || 0;
  });

  useMotionValueEvent(filterValuesBackgroundExposure, "change", (value) => {
    setBackgroundState((prev) => ({ ...prev, exposure: value }));
  });
  useMotionValueEvent(filterValuesBackgroundContrast, "change", (value) => {
    setBackgroundState((prev) => ({ ...prev, contrast: value }));
  });
  useMotionValueEvent(filterValuesBackgroundSaturation, "change", (value) => {
    setBackgroundState((prev) => ({ ...prev, saturation: value }));
  });
  useMotionValueEvent(filterValuesBackgroundTemp, "change", (value) => {
    setBackgroundState((prev) => ({ ...prev, temp: value }));
  });
  useMotionValueEvent(filterValuesBackgroundTint, "change", (value) => {
    setBackgroundState((prev) => ({ ...prev, tint: value }));
  });

  useMotionValueEvent(filterValuesForegroundExposure, "change", (value) => {
    setForegroundState((prev) => ({ ...prev, exposure: value }));
  });
  useMotionValueEvent(filterValuesForegroundContrast, "change", (value) => {
    setForegroundState((prev) => ({ ...prev, contrast: value }));
  });
  useMotionValueEvent(filterValuesForegroundSaturation, "change", (value) => {
    setForegroundState((prev) => ({ ...prev, saturation: value }));
  });
  useMotionValueEvent(filterValuesForegroundTemp, "change", (value) => {
    setForegroundState((prev) => ({ ...prev, temp: value }));
  });
  useMotionValueEvent(filterValuesForegroundTint, "change", (value) => {
    setForegroundState((prev) => ({ ...prev, tint: value }));
  });

  return (
    <div className="grid grid-cols-12 h-svh relative">
      <div
        className="relative col-start-1 col-end-10 grid grid-cols-2 p-6 pointer-events-none"
        ref={containerRef}
      >
        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-[900px] h-[660px] overflow-hidden">
          <motion.div
            className="absolute top-0 -left-full -right-full h-[300px]"
            style={{
              imageRendering: "pixelated",
              background: useMotionTemplate`radial-gradient(ellipse farthest-side at bottom, ${radialGradientColorBottom}, ${radialGradientColorTop})`,
            }}
          />
          <motion.div className="absolute inset-0" style={{}}>
            <motion.div className="absolute inset-0">
              <FieldImage
                exposure={filterValuesBackgroundExposure}
                contrast={filterValuesBackgroundContrast}
                saturation={filterValuesBackgroundSaturation}
                temp={filterValuesBackgroundTemp}
                tint={filterValuesBackgroundTint}
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
                exposure={filterValuesForegroundExposure}
                contrast={filterValuesForegroundContrast}
                saturation={filterValuesForegroundSaturation}
                temp={filterValuesForegroundTemp}
                tint={filterValuesForegroundTint}
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
            <div>{foregroundState.exposure.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   //   setForegroundState({ ...foregroundState, exposure: value[0] });
                // }}
                step={0.001}
                value={[foregroundState.exposure]}
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
            <div>{foregroundState.contrast.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   foregroundContrast.set(value[0]);
                // }}
                step={0.001}
                value={[foregroundState.contrast]}
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
            <div>{foregroundState.saturation.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   foregroundSaturation.set(value[0]);
                // }}
                step={0.001}
                value={[foregroundState.saturation]}
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
            <div>{foregroundState.temp.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={-1}
                max={1}
                // onValueChange={(value) => {
                //   foregroundTemp.set(value[0]);
                // }}
                step={0.001}
                value={[foregroundState.temp]}
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
            <div>{foregroundState.tint.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={-1}
                max={1}
                // onValueChange={(value) => {
                //   foregroundTint.set(value[0]);
                // }}
                step={0.001}
                value={[foregroundState.tint]}
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
              navigator.clipboard.writeText(JSON.stringify(foregroundState));
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
            <div>{backgroundState.exposure.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   backgroundExposure.set(value[0]);
                // }}
                step={0.001}
                value={[backgroundState.exposure]}
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
            <div>{backgroundState.contrast.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   backgroundContrast.set(value[0]);
                // }}
                step={0.001}
                value={[backgroundState.contrast]}
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
            <div>{backgroundState.saturation.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={0}
                max={2}
                // onValueChange={(value) => {
                //   backgroundSaturation.set(value[0]);
                // }}
                step={0.001}
                value={[backgroundState.saturation]}
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
            <div>{backgroundState.temp.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={-1}
                max={1}
                // onValueChange={(value) => {
                //   backgroundTemp.set(value[0]);
                // }}
                step={0.001}
                value={[backgroundState.temp]}
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
            <div>{backgroundState.tint.toFixed(3)}</div>
            <div className="flex flex-col w-full gap-1">
              <Slider
                min={-1}
                max={1}
                // onValueChange={(value) => {
                //   backgroundTint.set(value[0]);
                // }}
                step={0.001}
                value={[backgroundState.tint]}
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
              navigator.clipboard.writeText(JSON.stringify(backgroundState));
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
