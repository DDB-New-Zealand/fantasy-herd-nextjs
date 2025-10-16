import { cn } from "@/lib/utils";
import Placeholder from "./placeholder";

export type IconType = "stats" | "timeline" | "trophy" | "help" | "dark";

type Props = {
  type: IconType;
  className?: string;
};

const Icon = ({ type, className }: Props) => {
  return <Placeholder className={cn(className, "w-6 h-6")} />;
};

export default Icon;
