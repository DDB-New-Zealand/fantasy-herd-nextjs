import { cn } from "@/lib/utils";
import { ButtonLabelSmall } from "./ui/typography";

export const TabButton = ({
  selected,
  children,
}: {
  selected?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <ButtonLabelSmall asChild>
      <button
        type="button"
        className={cn(
          "h-[58px] w-full text-left p-6",
          " transition-colors ease-default duration-200",
          {
            "bg-primary text-primary-foreground": selected,
            "bg-background text-foreground/24": !selected,
          },
        )}
      >
        {children}
      </button>
    </ButtonLabelSmall>
  );
};
