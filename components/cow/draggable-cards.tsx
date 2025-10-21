import Placeholder from "../ui/placeholder";

export const CowDraggableCardPlaceHolder = () => {
  return (
    <div className="relative min-w-[156px] h-[112px] flex flex-col items-center justify-center gap-3">
      <svg
        width={156}
        height={112}
        className="block absolute inset-0 stroke-foreground"
        style={{ display: "block" }}
      >
        <rect
          x={1}
          y={1}
          width={154}
          height={110}
          rx={6}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="8,8"
          opacity={0.24}
        />
      </svg>
      <Placeholder className="w-[20px] h-[20px]" />
      ADD COW
    </div>
  );
};
