import { cn } from "@/lib/utils";
import {
  clamp,
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";

type Props = {
  randomSeedX: MotionValue<number>;
  randomSeedY: MotionValue<number>;
  springGlareX: MotionValue<number>;
  springGlareY: MotionValue<number>;
  springGlareOpacity: MotionValue<number>;
  springRotateX: MotionValue<number>;
  springRotateY: MotionValue<number>;
  springRotateDeltaX: MotionValue<number>;
  springRotateDeltaY: MotionValue<number>;
  springBackgroundX: MotionValue<number>;
  springBackgroundY: MotionValue<number>;
  springTranslateX: MotionValue<number>;
  springTranslateY: MotionValue<number>;

  maskUrl: string;
  foilUrl: string;
  faceUrl: string;

  width: number;
  height: number;
};

const Card: React.FC<Props> = (props) => {
  const {
    randomSeedX,
    randomSeedY,
    springGlareX,
    springGlareY,
    springGlareOpacity,
    springRotateX,
    springRotateY,
    springRotateDeltaX,
    springRotateDeltaY,
    springBackgroundX,
    springBackgroundY,
    springTranslateX,
    springTranslateY,

    maskUrl,
    foilUrl,
    faceUrl,

    width,
    height,
  } = props;

  const cosmosPosition = {
    x: useTransform(randomSeedX, (value) => Math.floor(value * 734)),
    y: useTransform(randomSeedY, (value) => Math.floor(value * 734)),
  };
  const cosmosBgTemplate = useMotionTemplate`${cosmosPosition.x}px ${cosmosPosition.y}px`;

  //     --pointer-x: ${$springGlareX}%;
  const pointerX = useMotionTemplate`${springGlareX}%`;
  //     --pointer-y: ${$springGlareY}%;
  const pointerY = useMotionTemplate`${springGlareY}%`;

  //     --pointer-from-center: ${clamp(
  //       Math.sqrt(
  //         ($springGlareY - 50) * ($springGlareY - 50) +
  //           ($springGlareX - 50) * ($springGlareX - 50),
  //       ) / 50,
  //       0,
  //       1,
  //     )};
  const pointerCenter = useMotionValue(0);
  const onSpringGlareChange = () => {
    pointerCenter.set(
      clamp(
        0,
        1,
        Math.sqrt(
          (springGlareY.get() - 50) * (springGlareY.get() - 50) +
            (springGlareX.get() - 50) * (springGlareX.get() - 50),
        ) / 50,
      ),
    );
  };
  useMotionValueEvent(springGlareX, "change", onSpringGlareChange);
  useMotionValueEvent(springGlareY, "change", onSpringGlareChange);

  //     --pointer-from-top: ${$springGlareY / 100};
  const pointerFromTop = useTransform(springGlareY, (v) => v / 100);
  //     --pointer-from-left: ${$springGlareX / 100};
  const pointerFromLeft = useTransform(springGlareX, (v) => v / 100);

  //    "--translate-x": ${$springTranslateX}px,
  const translateX = useMotionTemplate`${springTranslateX}px`;
  //    "--translate-y": ${$springTranslateY}px,
  const translateY = useMotionTemplate`${springTranslateY}px`;

  //     --rotate-x: ${$springRotateX + $springRotateDeltaX}deg;
  const rotateX = useMotionValue("");
  //     --rotate-y: ${$springRotateY + $springRotateDeltaY}deg;
  const rotateY = useMotionValue("");

  const onSpringRotateChange = () => {
    rotateX.set(`${springRotateX.get() + springRotateDeltaX.get()}deg`);
    rotateY.set(`${springRotateY.get() + springRotateDeltaY.get()}deg`);
  };
  useMotionValueEvent(springRotateX, "change", onSpringRotateChange);
  useMotionValueEvent(springRotateY, "change", onSpringRotateChange);
  useMotionValueEvent(springRotateDeltaX, "change", onSpringRotateChange);
  useMotionValueEvent(springRotateDeltaY, "change", onSpringRotateChange);

  //    "--background-x": ${$springBackgroundX}%,
  const backgroundX = useMotionTemplate`${springBackgroundX}%`;
  //    "--background-y": ${$springBackgroundY}%,
  const backgroundY = useMotionTemplate`${springBackgroundY}%`;

  const springScale = useSpring(1);
  //    "--card-scale": ${$springScale},
  const scale = useMotionTemplate`${springScale}`;

  const handlePointerMove = (
    e:
      | React.PointerEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    let clientX: number, clientY: number;
    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.PointerEvent).clientX;
      clientY = (e as React.PointerEvent).clientY;
    }
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const percentX = Math.max(
      0,
      Math.min(100, Math.round((100 / rect.width) * x)),
    );
    const percentY = Math.max(
      0,
      Math.min(100, Math.round((100 / rect.height) * y)),
    );
    const centerX = percentX - 50;
    const centerY = percentY - 50;
    // Update motion values for interactive effect
    springBackgroundX.set(percentX);
    springBackgroundY.set(percentY);
    springRotateX.set(-centerX / 3.5);
    springRotateY.set(centerY / 2);
    springGlareX.set(percentX);
    springGlareY.set(percentY);
    springGlareOpacity.set(1);
  };

  const handlePointerLeave = () => {
    // Reset motion values when interaction ends
    springRotateX.set(0);
    springRotateY.set(0);
    springGlareX.set(50);
    springGlareY.set(50);
    springGlareOpacity.set(0);
    springBackgroundX.set(50);
    springBackgroundY.set(50);
  };

  return (
    <motion.div
      className={cn(
        "card water / interactive masked",
        // "w-[327px] h-[500px]",
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      )}
      style={
        {
          "--pointer-x": pointerX,
          "--pointer-y": pointerY,
          "--pointer-from-center": pointerCenter,
          "--pointer-from-top": pointerFromTop,
          "--pointer-from-left": pointerFromLeft,
          "--card-opacity": springGlareOpacity,
          "--rotate-x": rotateX,
          "--rotate-y": rotateY,
          "--background-x": backgroundX,
          "--background-y": backgroundY,
          "--card-scale": scale,
          "--translate-x": translateX,
          "--translate-y": translateY,
          "--card-aspect": width / height,
          "--card-radius": 0,
          width,
          height,
        } as React.CSSProperties
      }
      data-number="swsh181"
      data-set="swshp"
      data-subtypes="basic v rapid strike"
      data-supertype="cow"
      data-rarity="rare holo v"
      data-trainer-gallery="false"
    >
      {/* .card__translater */}
      <div
        // className="relative grid [perspective:600px] will-change-transform [transform-origin:center] [transform-style:preserve-3d] w-full h-full"
        className={cn("card__translater", "w-full h-full")}
      >
        {/* card__rotator */}
        <button
          type="button"
          className={"card__rotator"}
          aria-label="Expand the Card"
          tabIndex={0}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerLeave}
        >
          {/* card__back */}
          <Image
            className={"card__back"}
            // className="absolute inset-0 w-full h-auto rounded-[4.55%/3.5%] aspect-[0.718] [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[var(--card-back)]"
            src="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
            alt="Back of the card"
            loading="lazy"
            width={width}
            height={height}
            unoptimized
          />
          {/* card__front */}
          <motion.div
            className={"card__front"}
            style={
              {
                // different colors
                "--seedx": randomSeedX,
                "--seedy": randomSeedY,
                "--cosmosbg": cosmosBgTemplate,
                "--mask": `url(${maskUrl})`,
                "--foil": `url(${foilUrl})`,
              } as React.CSSProperties
            }
          >
            <Image
              className="card_img"
              // className="w-full h-auto rounded-[4.55%/3.5%] aspect-[0.718] [backface-visibility:hidden] [transform:translate3d(0px,0px,0.01px)]"
              src={faceUrl}
              alt="Front design of the {name} Pokemon Card, with the stats and info around the edge"
              width={width}
              height={height}
              unoptimized
            />
            {/* card__shine */}
            <div className={"card__shine"} />
            {/* card__glare */}
            <div className={"card__glare"} />
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
};

export default Card;
