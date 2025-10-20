import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import Icon, { IconType } from "./ui/icon";
import { CheckCardDescription, CheckCardTitle } from "./ui/typography";

export const CheckCard: React.FC<{
  title: string;
  description: string;
  icon: IconType;
  checked: boolean;
}> = ({ title, description, icon, checked }) => {
  return (
    <div
      className={cn(
        "border grid grid-cols-[auto_auto] grid-rows-[auto_auto] p-5 gap-5",
        {
          "bg-border": checked,
        },
      )}
    >
      <div className="col-span-full">
        <div
          className={cn("border w-20 h-20 flex items-center justify-center", {
            "bg-foreground/6": checked,
            "bg-primary": !checked,
          })}
        >
          <Icon type={icon} className={"w-[24px] h-[24px]"} />
        </div>
      </div>
      <div className="place-content-end">
        <CheckCardTitle>{title}</CheckCardTitle>
        <CheckCardDescription className="mt-5">
          {description}
        </CheckCardDescription>
      </div>
      <div className="place-self-end flex justify-end items-end">
        <Checkbox checked={checked} />
      </div>
    </div>
  );
};
