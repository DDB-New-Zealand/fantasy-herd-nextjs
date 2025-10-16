export const GREY = "#F2F2F2";
export const WHITE = "#FFFFFF";
export const BLACK = "#000000";
export const DEW_GREEN = "#CAFDC3";
export const MEADOW_FRESH_PRIMARY_GREEN = "#50D848";
export const DEEP_GREEN = "#0D180D";
export const MOSS_GREEN = "#192319";
export const MEADOW_FRESH_FOREST_GREEN = "#008047";

export const convertHexToRgba = (hex: string) => {
  let hexValue = hex.replace("#", "");
  let alpha = 1;

  if (hexValue.length === 8) {
    alpha = parseInt(hexValue.slice(7, 9), 16) / 255;
    hexValue = hexValue.slice(0, 7);
  }

  const r = parseInt(hexValue.slice(0, 2), 16);
  const g = parseInt(hexValue.slice(2, 4), 16);
  const b = parseInt(hexValue.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
