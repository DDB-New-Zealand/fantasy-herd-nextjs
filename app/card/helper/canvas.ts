export type Section = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export const clearSection = (
  ctx: CanvasRenderingContext2D,
  section: Section
) => {
  ctx.clearRect(section.x, section.y, section.w, section.h);
};

export const getGradientStyle = (
  ctx: CanvasRenderingContext2D,
  section: Section,
  direction: [number, number], // x, y
  colors: {
    offset: number;
    color: string;
  }[]
) => {
  // Calculate gradient end points based on direction
  const x0 = section.x;
  const y0 = section.y;
  const x1 = section.x + section.w * direction[0];
  const y1 = section.y + section.h * direction[1];

  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

  // Add color stops
  colors.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });

  return gradient;
};

export const drawBackgroundGradient = (
  ctx: CanvasRenderingContext2D,
  section: Section,
  direction: [number, number], // x, y
  colors: {
    offset: number;
    color: string;
  }[]
) => {
  const gradient = getGradientStyle(ctx, section, direction, colors);

  ctx.fillStyle = gradient;
  ctx.fillRect(section.x, section.y, section.w, section.h);
};

export const fillText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  style: CanvasFillStrokeStyles["fillStyle"],
  font: CanvasTextDrawingStyles["font"]
) => {
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = style;
  ctx.textBaseline = "bottom";

  const measurement = ctx.measureText(text);

  ctx.fillText(text, x - measurement.width / 2, y);
  ctx.restore();
};

export const strokeText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  style: CanvasFillStrokeStyles["fillStyle"],
  font: CanvasTextDrawingStyles["font"]
) => {
  ctx.save();
  ctx.font = font;
  ctx.strokeStyle = style;
  ctx.textBaseline = "bottom";

  const measurement = ctx.measureText(text);

  ctx.strokeText(text, x - measurement.width / 2, y);
  ctx.restore();
};
