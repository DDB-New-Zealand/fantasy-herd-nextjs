import ButtonBackground from "@/app/assets/button-background.png";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "flex items-center justify-center transition-color ease-default duration-300 gap-2",
  {
    variants: {
      variant: {
        default: "",
        primary: "bg-primary text-primary-foreground hover:bg-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/50",
        "outline-hard":
          "border-foreground border text-foreground hover:bg-foreground/4 disabled:bg-transparent disabled:text-foreground/24",
        outline:
          "border-foreground/24 border text-foreground hover:bg-foreground/4 disabled:bg-transparent disabled:text-foreground/24",
        pattern: "bg-foreground text-background hover:bg-foreground/80",
        underline: "underline hover:opacity-50",
      },
      size: {
        default:
          "w-full h-[44px] font-paragraph text-[14px] leading-[82%] -tracking-[0.03em]",
        lg: "w-full h-[48px] font-paragraph text-[14px] leading-[82%] -tracking-[0.03em]",
        fixed:
          "py-[14px] w-[146px] text-[16px] font-paragraph text-[16px] leading-[128%] -tracking-[0.03em]",
        link: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  if (variant === "pattern") {
    return (
      <Comp
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative overflow-hidden",
        )}
        {...props}
      >
        <div>
          <div
            className="absolute top-0 left-0 w-[146px] h-[48px] mask-size-[100%] bg-primary"
            style={{
              maskType: "luminance",
              maskMode: "luminance",
              maskImage: `url(${ButtonBackground.src})`,
            }}
          ></div>
          {props.children}
        </div>
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
