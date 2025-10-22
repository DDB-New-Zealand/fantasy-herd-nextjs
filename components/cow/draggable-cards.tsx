import { CowData } from "@/constants/cows";
import { cn } from "@/lib/utils";
import { Price } from "../price";
import { Rating } from "../rating";
import Placeholder from "../ui/placeholder";
import { DraggableCardLabel, DraggableCardTitle } from "../ui/typography";

export const CowDraggableCardPlaceHolder = () => {
  return (
    <div className="relative min-w-[156px] h-[112px] flex flex-col items-center justify-center gap-3">
      <svg
        width={156}
        height={112}
        className="block absolute inset-0 stroke-foreground"
      >
        <rect
          x={0.5}
          y={0.5}
          width={155}
          height={111}
          rx={6}
          fill="none"
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

export const CowDraggableCard: React.FC<{
  cow: CowData;
  className?: string;
}> = ({ cow, className }) => {
  return (
    <div
      className={cn(
        "relative min-w-[156px] h-[112px] bg-background rounded-[6px] border p-1.5 flex flex-col items-center justify-center gap-1",
        className,
      )}
    >
      <div className="flex justify-between items-center w-full">
        <DraggableCardLabel asChild>
          <Price className="">{cow.price}</Price>
        </DraggableCardLabel>
        <Rating size="sm" rating={cow.rating}></Rating>
      </div>
      <Placeholder className="grow w-full h-auto" />
      <div className="relative flex justify-between items-center w-full">
        <DraggableCardTitle>{cow.name}</DraggableCardTitle>
        <Placeholder className="absolute bottom-0 right-0 w-[34px] h-[34px]" />
      </div>
    </div>
  );
};

export const CowDraggableCardPlaceHolderField: React.FC<{
  className?: string;
  hover?: boolean;
}> = ({ className, hover }) => {
  return (
    <div className={cn("relative w-[130px] h-[168px]", className)}>
      <div
        className={cn("absolute inset-0 rounded-[6px]", {
          "bg-primary/30 text-primary-foreground": hover,
          "bg-background text-foreground": !hover,
        })}
      ></div>
      <svg
        width={hover ? 138 : 130}
        height={hover ? 176 : 168}
        className={cn("absolute top-1/2 left-1/2 -translate-1/2", {
          "stroke-foreground": !hover,
          "stroke-primary": hover,
        })}
      >
        <rect
          x={0.5}
          y={0.5}
          width={hover ? 137 : 129}
          height={hover ? 175 : 167}
          rx={6}
          fill="none"
          strokeWidth={1}
          strokeDasharray="8,8"
          opacity={hover ? 1 : 0.24}
        />
      </svg>
      <div
        className={cn(
          "absolute inset-0",
          "flex flex-col items-center justify-center gap-3",
        )}
      >
        <Placeholder className="w-[20px] h-[20px]" />
        ADD COW
      </div>
    </div>
  );
};

export const CowDraggableCardField: React.FC<{
  cow: CowData;
  className?: string;
}> = ({ cow, className }) => {
  return (
    <div
      className={cn(
        "relative w-[130px] h-[168px] bg-background rounded-[6px] border p-1.5 flex flex-col items-center justify-center gap-1",
        className,
      )}
    >
      <div className="flex justify-between items-center w-full">
        <DraggableCardLabel asChild>
          <Price className="">{cow.price}</Price>
        </DraggableCardLabel>
        <Rating size="sm" rating={cow.rating}></Rating>
      </div>
      <Placeholder className="grow w-full h-auto" />
      <div className="relative flex justify-between items-center w-full">
        <DraggableCardTitle>{cow.name}</DraggableCardTitle>
        <Placeholder className="absolute bottom-0 right-0 w-[34px] h-[34px]" />
      </div>
    </div>
  );
};
