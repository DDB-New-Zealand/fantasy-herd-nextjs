import { cn } from "@/lib/utils";
import { AlertBannerParagraph, BannerLabel } from "./ui/typography";
import Icon from "./ui/icon";

type BannerProps = React.PropsWithChildren<{
  className?: string;
  muted?: boolean;
}>;

export const Banner: React.FC<BannerProps> = (props) => {
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

type AlertBannerProps = React.PropsWithChildren<{
  className?: string;
  type?: "info";
}>;

export const AlertBanner: React.FC<AlertBannerProps> = (props) => {
  const { children, className, type = "info" } = props;

  return (
    <AlertBannerParagraph
      className={cn(
        "flex flex-col gap-1 p-2 bg-info text-left text-primary-foreground",
        className,
      )}
      asChild
    >
      <div>
        <Icon className="w-3 h-3" type={"info"} />
        <p className="">{children}</p>
      </div>
    </AlertBannerParagraph>
  );
};
