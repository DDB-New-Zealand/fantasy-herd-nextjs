import { cn } from "@/lib/utils";
import { ButtonLabelSmall } from "./ui/typography";
import { Slot } from "@radix-ui/react-slot";

export const TabButton = ({
  selected,
  asChild,
  ...props
}: React.ComponentProps<"button"> & {
  selected?: boolean;
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : "button";

  return (
    <ButtonLabelSmall asChild>
      <Comp
        type="button"
        {...props}
        className={cn(
          "h-[58px] w-full text-left p-6",
          " transition-colors ease-default duration-200",
          {
            "bg-primary text-primary-foreground hover:bg-primary/50": selected,
            "bg-background text-foreground/24 hover:text-foreground": !selected,
          },
          props.className,
        )}
      />
    </ButtonLabelSmall>
  );
};
