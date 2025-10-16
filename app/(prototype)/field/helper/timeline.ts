import { cubicBezier, transform } from "motion";

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
  cloud: {
    opacity: number;
    exposure: number;
    contrast: number;
    saturation: number;
    temp: number;
    tint: number;
  };
  sun: {
    opacity: number;
    angle: number;
  };
};

export const sunAppearTime = 7;
export const sunDisappearTime = 19.5;

const timeline: TimelineState[] = [
  {
    time: [0, 6],
    colors: ["#132537", "#0B1017"],
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
    cloud: {
      opacity: 0.5,
      exposure: 0.827,
      contrast: 1.51,
      saturation: 0.436,
      temp: -1,
      tint: 0.126,
    },
    sun: {
      opacity: 0,
      angle: 0,
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
    cloud: {
      opacity: 0.8,
      exposure: 1,
      contrast: 1,
      saturation: 0.33,
      temp: 0.061,
      tint: 0.01,
    },
    sun: {
      opacity: 0,
      angle: 0,
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
    cloud: {
      opacity: 1,
      exposure: 1.329,
      contrast: 0.686,
      saturation: 1,
      temp: 0,
      tint: -0.025,
    },
    sun: {
      opacity: 1,
      angle: 20,
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
    cloud: {
      opacity: 1,
      exposure: 1.29,
      contrast: 0.765,
      saturation: 1,
      temp: -0.508,
      tint: 0.075,
    },
    sun: {
      opacity: 0,
      angle: 0,
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
    cloud: {
      opacity: 1,
      exposure: 1.419,
      contrast: 0.643,
      saturation: 0.593,
      temp: 0,
      tint: -0.005,
    },
    sun: {
      opacity: 1,
      angle: -20,
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
    cloud: {
      opacity: 0.8,
      exposure: 1.448,
      contrast: 0.661,
      saturation: 0.439,
      temp: -0.22,
      tint: -0.014,
    },
    sun: {
      opacity: 0,
      angle: 0,
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
    cloud: {
      opacity: 0.5,
      exposure: 0.827,
      contrast: 1.51,
      saturation: 0.436,
      temp: -1,
      tint: 0.126,
    },
    sun: {
      opacity: 0,
      angle: 0,
    },
  },
  {
    time: [21.5, 24],
    colors: ["#132537", "#0B1017"],
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
    cloud: {
      opacity: 0.5,
      exposure: 0.827,
      contrast: 1.51,
      saturation: 0.436,
      temp: -1,
      tint: 0.126,
    },
    sun: {
      opacity: 0,
      angle: 0,
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
          }
        ),
      transformer2: (value) =>
        transform(
          value,
          [prevItem.time[1], currItem.time[0]],
          [prevItem.transformer2(prevItem.time[1]), currItem.colors[1]],
          {
            ease: cubicBezier(0.3, 0, 0.2, 1),
          }
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
  []
);

export const getRadialGradient = (time: number) => {
  const transformer = radialGradientTimeline.find(
    (transformer) => time >= transformer.time[0] && time <= transformer.time[1]
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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

export const getFilterTimeline = (time: number) => {
  const transformer = filterTimeline.find(
    (transformer) => time >= transformer.time[0] && time <= transformer.time[1]
  );

  return transformer?.transformers(time);
};

type CloudTimelineState = {
  time: [number, number];
  transformers: (value: number) => {
    opacity: number;
    exposure: number;
    contrast: number;
    saturation: number;
    temp: number;
    tint: number;
  };
};

const cloudTimeline = timeline.reduce<CloudTimelineState[]>((prev, curr) => {
  if (prev.length === 0) {
    return [
      {
        time: curr.time,
        transformers: () => {
          return {
            opacity: curr.cloud.opacity,
            exposure: curr.cloud.exposure,
            contrast: curr.cloud.contrast,
            saturation: curr.cloud.saturation,
            temp: curr.cloud.temp,
            tint: curr.cloud.tint,
          };
        },
      },
    ];
  }

  const prevItem: CloudTimelineState = {
    ...prev[prev.length - 1],
    time: [prev[prev.length - 1].time[0], prev[prev.length - 1].time[1]],
  };
  const currItem: TimelineState = {
    ...curr,
    time: [curr.time[0], curr.time[1]],
  };
  prevItem.time[1] -= 0.2;
  currItem.time[0] += 0.2;

  const intermediatePeriod: CloudTimelineState["time"] = [
    prevItem.time[1],
    currItem.time[0],
  ];

  const intermediateItem: CloudTimelineState = {
    time: intermediatePeriod,
    transformers: (value: number) => {
      return {
        opacity: transform(
          value,
          intermediatePeriod,
          [
            prevItem.transformers(prevItem.time[1]).opacity,
            currItem.cloud.opacity,
          ],
          {
            ease: cubicBezier(0.3, 0, 0.2, 1),
          }
        ),
        exposure: transform(
          value,
          intermediatePeriod,
          [
            prevItem.transformers(prevItem.time[1]).exposure,
            currItem.cloud.exposure,
          ],
          {
            ease: cubicBezier(0.3, 0, 0.2, 1),
          }
        ),
        contrast: transform(
          value,
          intermediatePeriod,
          [
            prevItem.transformers(prevItem.time[1]).contrast,
            currItem.cloud.contrast,
          ],
          {
            ease: cubicBezier(0.3, 0, 0.2, 1),
          }
        ),
        saturation: transform(
          value,
          intermediatePeriod,
          [
            prevItem.transformers(prevItem.time[1]).saturation,
            currItem.cloud.saturation,
          ],
          {
            ease: cubicBezier(0.3, 0, 0.2, 1),
          }
        ),
        temp: transform(
          value,
          intermediatePeriod,
          [prevItem.transformers(prevItem.time[1]).temp, currItem.cloud.temp],
          {
            ease: cubicBezier(0.3, 0, 0.2, 1),
          }
        ),
        tint: transform(
          value,
          intermediatePeriod,
          [prevItem.transformers(prevItem.time[1]).tint, currItem.cloud.tint],
          {
            ease: cubicBezier(0.3, 0, 0.2, 1),
          }
        ),
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
        opacity: currItem.cloud.opacity,
        exposure: currItem.cloud.exposure,
        contrast: currItem.cloud.contrast,
        saturation: currItem.cloud.saturation,
        temp: currItem.cloud.temp,
        tint: currItem.cloud.tint,
      }),
    },
  ];
}, []);

export const getCloudTimeline = (time: number) => {
  const transformer = cloudTimeline.find(
    (transformer) => time >= transformer.time[0] && time <= transformer.time[1]
  );

  return transformer?.transformers(time);
};

type SunTimelineState = {
  time: [number, number];
  transformers: (value: number) => {
    opacity: number;
    angle: number;
  };
};

const sunTimeline = timeline.reduce<SunTimelineState[]>((prev, curr) => {
  if (prev.length === 0) {
    return [
      {
        time: curr.time,
        transformers: () => {
          return {
            opacity: curr.sun.opacity,
            angle: curr.sun.angle,
          };
        },
      },
    ];
  }

  const prevItem: SunTimelineState = {
    ...prev[prev.length - 1],
    time: [prev[prev.length - 1].time[0], prev[prev.length - 1].time[1]],
  };
  const currItem: TimelineState = {
    ...curr,
    time: [curr.time[0], curr.time[1]],
  };
  prevItem.time[1] -= 0.2;
  currItem.time[0] += 0.2;

  const intermediatePeriod: SunTimelineState["time"] = [
    prevItem.time[1],
    currItem.time[0],
  ];

  const intermediateItem: SunTimelineState = {
    time: intermediatePeriod,
    transformers: (value: number) => {
      return {
        opacity: transform(
          value,
          intermediatePeriod,
          [
            prevItem.transformers(prevItem.time[1]).opacity,
            currItem.sun.opacity,
          ],
          {
            ease: cubicBezier(0.3, 0, 0.2, 1),
          }
        ),
        angle: transform(
          value,
          intermediatePeriod,
          [prevItem.transformers(prevItem.time[1]).angle, currItem.sun.angle],
          {
            ease: cubicBezier(0.3, 0, 0.2, 1),
          }
        ),
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
        opacity: currItem.sun.opacity,
        angle: currItem.sun.angle,
      }),
    },
  ];
}, []);

export const getSunTimeline = (time: number) => {
  const transformer = sunTimeline.find(
    (transformer) => time >= transformer.time[0] && time <= transformer.time[1]
  );

  return transformer?.transformers(time);
};
