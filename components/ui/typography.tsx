import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

type Props = {
  className?: string;
  asChild?: boolean;
} & React.PropsWithChildren;

export const HomeTitle: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "h1";

  return (
    <Comp
      className={cn(
        `font-title text-center text-[158px] leading-[74%] tracking-[0em] whitespace-pre-line bg-clip-text text-transparent bg-title-gradient`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const HomeParagraph: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn(
        `font-paragraph text-center text-[26px] leading-[108%] -tracking-[0.03em] whitespace-pre-line`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const HomeFooter: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn(
        `font-paragraph text-center text-[12px] leading-[128%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const BannerLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn(
        `font-paragraph text-center text-[14px] leading-[128%] -tracking-[0.03em] uppercase`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SidePanelButtonLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn(
        `font-paragraph text-center text-[10px] leading-[82%] -tracking-[0.01em] uppercase align-middle`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const WeatherWidgetTitle: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "h4";

  return (
    <Comp
      className={cn(
        `font-title text-[72px] leading-[74%] tracking-[0em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const WeatherLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[10px] leading-[82%] tracking-[0.04em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const WeatherValue: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[18px] leading-[82%] tracking-[0.04em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const ButtonLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[16px] leading-[128%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const ButtonLabelSmall: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[14px] leading-[82%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PageTitle: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "h1";

  return (
    <Comp
      className={cn(
        `font-title text-[54px] leading-[74%] tracking-[0em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PageDescription: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[16px] leading-[112%] tracking-[0em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const CheckCardTitle: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "h3";

  return (
    <Comp
      className={cn(
        `font-title text-[54px] leading-[74%] tracking-[0em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const CheckCardDescription: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[14px] leading-[112%] tracking-[0.04em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const TableListHeader: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[10px] leading-[82%] tracking-[0.04em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const TableListTitle: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-title text-[32px] leading-[82%] tracking-[0.02em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const TableValue: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[20px] leading-[128%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerAreaLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-center text-[14px] leading-[82%] tracking-[0.04em] uppercase`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerCardTitle: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "h3";

  return (
    <Comp
      className={cn(
        `font-title text-[32px] leading-[82%] tracking-[0.02em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerCardValue: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[20px] leading-[128%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerDetailTitle: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "h4";

  return (
    <Comp
      className={cn(
        `font-title text-[64px] leading-[74%] tracking-[0em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerDetailLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[10px] leading-[82%] tracking-[0.04em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerDetailValue: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[28px] leading-[128%] -tracking-[0.02em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerDetailValueLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[10px] leading-[96%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerDetailCarouselLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[10px] leading-[82%] tracking-[0.04em] uppercase`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerDetailTableHeader: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[10px] leading-[82%] tracking-[0.04em] uppercase`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerDetailTableLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[10px] leading-[128%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerDetailTableValue: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[18px] leading-[128%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PlayerCardViewHelperLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[14px] leading-[82%] -tracking-[0.03em] uppercase`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const FieldLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "label";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[14px] leading-[132%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SummaryValue: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[48px] leading-[82%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SummaryValueLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[20px] leading-[82%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SummaryLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[12px] leading-[82%] tracking-[0.04em] uppercase`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SummaryDescription: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[12px] leading-[112%] tracking-[0.04em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SummarySectionTitle: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "h2";

  return (
    <Comp
      className={cn(
        `font-title text-[42px] leading-[82%] tracking-[0.02em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SummaryTableHeader: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[10px] leading-[82%] tracking-[0.04em] uppercase`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SummaryTableLabelBig: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        `font-title text-[18px] leading-[128%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SummaryTableLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[12px] leading-[128%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SummaryTableLabelSmall: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[12px] leading-[82%] tracking-[0.04em] uppercase`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SummaryTableValue: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[18px] leading-[128%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const SummaryTableValueSmall: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[12px] leading-[82%] tracking-[0.04em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const HelperLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[10px] leading-[82%] tracking-[0.04em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PaginationLabel: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[10px] leading-[128%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export const PaginationValue: React.FC<Props> = (props) => {
  const { className, asChild, children } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        `font-paragraph text-[16px] leading-[128%] -tracking-[0.03em]`,
        className,
      )}
    >
      {children}
    </Comp>
  );
};
