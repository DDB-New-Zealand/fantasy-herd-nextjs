import { MotionValue } from "motion";
import { useAnimationFrame, useMotionValueEvent } from "motion/react";
import { useEffect, useRef } from "react";
import { initWebGL } from "./helper/filter-image";
import Field from "./images/field.png";

type Props = {
  exposure: MotionValue<number>;
  contrast: MotionValue<number>;
  saturation: MotionValue<number>;
  temp: MotionValue<number>;
  tint: MotionValue<number>;
};

const FieldImage: React.FC<Props> = (props) => {
  const { exposure, contrast, saturation, temp, tint } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderRef =
    useRef<
      (
        exposure: number,
        contrast: number,
        saturation: number,
        temp: number,
        tint: number,
        alpha: number,
      ) => void
    >(null);
  const invalidatedRef = useRef(true);

  useEffect(() => {
    const FieldImg = new Image();
    FieldImg.src = Field.src;

    FieldImg.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = 900 * 2;
      canvas.height = 600 * 2;

      console.log("init Webgl ", canvas, FieldImg);

      const render = initWebGL(canvas, FieldImg);

      if (render) {
        renderRef.current = render;
        render(
          exposure.get(),
          contrast.get(),
          saturation.get(),
          temp.get(),
          tint.get(),
          1.0, // alpha threshold
        );
      }
    };
  }, [exposure, contrast, saturation, temp, tint]);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    if (invalidatedRef.current) {
      renderRef.current?.(
        exposure.get(),
        contrast.get(),
        saturation.get(),
        temp.get(),
        tint.get(),
        0.5, // alpha threshold
      );

      invalidatedRef.current = false;
    }
  });

  const invalidate = () => {
    invalidatedRef.current = true;
  };

  useMotionValueEvent(exposure, "change", invalidate);
  useMotionValueEvent(contrast, "change", invalidate);
  useMotionValueEvent(saturation, "change", invalidate);
  useMotionValueEvent(temp, "change", invalidate);
  useMotionValueEvent(tint, "change", invalidate);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 right-0 bottom-0 w-full aspect-[9/6]"
    />
  );
};

export default FieldImage;
