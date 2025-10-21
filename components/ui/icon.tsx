import { cn } from "@/lib/utils";
import Placeholder from "./placeholder";

export type IconType =
  | "stats"
  | "timeline"
  | "trophy"
  | "help"
  | "dark"
  | "light"
  | "time"
  | "sunny"
  | "partly_cloudy"
  | "cloud"
  | "grass"
  | "flag"
  | "scan"
  | "transfer"
  | "user"
  | "search"
  | "plus"
  | "chevron";

type Props = {
  type: IconType;
  className?: string;
};

const Icon = ({ type, className }: Props) => {
  return <Placeholder className={cn("w-6 h-6", className)} />;
};

export default Icon;
