import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import ButtonBackground from "@/app/assets/button-background.png";
import Image from "next/image";

const buttonVariants = cva(
  "flex items-center justify-center transition-color ease-default duration-300",
  {
    variants: {
      variant: {
        default: "",
        primary: "",
        outline: "border-foreground border hover:bg-foreground/4",
        pattern: "bg-foreground text-background hover:bg-foreground/80",
      },
      size: {
        default: "",
        fixed: "py-[14px] w-[146px]",
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

{
  /* <Command>
  <CommandInput placeholder="Search framework..." />
  <CommandList>
    <CommandEmpty>No framework found.</CommandEmpty>
    <CommandGroup>
      {frameworks.map((framework) => (
        <CommandItem
          key={framework.value}
          value={framework.value}
          onSelect={(currentValue) => {
            setValue(currentValue === value ? "" : currentValue);
            setOpen(false);
          }}
        >
          <CheckIcon
            className={cn(
              "mr-2 h-4 w-4",
              value === framework.value ? "opacity-100" : "opacity-0",
            )}
          />
          {framework.label}
        </CommandItem>
      ))}
    </CommandGroup>
  </CommandList>
</Command> */
}
