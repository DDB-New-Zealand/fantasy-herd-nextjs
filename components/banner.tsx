import { cn } from "@/lib/utils";
import { BannerLabel } from "./ui/typography";

type Props = React.PropsWithChildren<{ className?: string; muted?: boolean }>;

export const Banner: React.FC<Props> = (props) => {
  const { children, className, muted } = props;

  return (
    <BannerLabel asChild>
      <div
        className={cn(
          "h-[30px] flex items-center justify-center gap-1 px-[10px] py-[6px]",
          {
            "w-full bg-primary text-primary-foreground border": !muted,
            "text-foreground/24 border": muted,
          },
          className,
        )}
      >
        {children}
      </div>
    </BannerLabel>
  );
};
