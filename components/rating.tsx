import { cn } from "@/lib/utils";
import {
  PlayerDetailValue,
  PlayerDetailValueLabel,
  TableValue,
} from "./ui/typography";

export type Rating = "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-";

type Props = {
  size?: "sm" | "lg";
  rating: Rating;
};

export const Rating = ({ size = "sm", rating }: Props) => {
  return (
    <div className="flex items-center justify-between">
      {size === "sm" ? (
        <TableValue className="flex items-center w-[36px]">{rating}</TableValue>
      ) : (
        <div className="flex flex-col items-start justify-center pr-[9px]">
          <PlayerDetailValue>{rating}</PlayerDetailValue>
          <PlayerDetailValueLabel>Rating</PlayerDetailValueLabel>
        </div>
      )}
      <div
        className={cn("relative border border-foreground bg-foreground", {
          "min-w-[8px] h-[16px] rounded-[1px]": size === "sm",
          "min-w-[12px] h-[33px] rounded-[2px]": size === "lg",
        })}
      >
        <div
          className={cn("w-full rounded-[1px] absolute bottom-0", {
            "bg-rating-success h-full": rating === "A+",
            "bg-rating-success h-[89.15%]": rating === "A",
            "bg-rating-success h-[78%]": rating === "A-",
            "bg-rating-warning h-[66.85%]": rating === "B+",
            "bg-rating-warning h-[55.71%]": rating === "B",
            "bg-rating-warning h-[44.57%]": rating === "B-",
            "bg-rating-error h-[33.43%]": rating === "C+",
            "bg-rating-error h-[22.28%]": rating === "C",
            "bg-rating-error h-[11.14%]": rating === "C-",
          })}
        ></div>
      </div>
    </div>
  );
};
