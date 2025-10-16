import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Placeholder: React.FC<Props> = (props) => {
  const { className } = props;

  return <div className={cn("bg-foreground/8 w-2 h-2", className)}></div>;
};

export default Placeholder;
