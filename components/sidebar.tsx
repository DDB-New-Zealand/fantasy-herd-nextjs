"use client";

import Cow from "@/app/assets/logo/cow.svg";
import MeadowFreshSmall from "@/app/assets/logo/meadow_fresh_small.svg";
import { cn } from "@/lib/utils";
import useUserStore from "@/stores/user-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeButton } from "./theme-button";
import Icon, { IconType } from "./ui/icon";
import { SidePanelButtonLabel } from "./ui/typography";

export const SidebarLogo: React.FC<{ selected?: boolean }> = ({ selected }) => {
  return (
    <Link
      className={cn(
        "relative w-20 py-[22px] px-1.5 flex flex-col items-center justify-center gap-3",
        {
          "bg-primary hover:bg-primary/50 text-primary-foreground": selected,
          "bg-background hover:bg-muted/50 text-foreground": !selected,
        },
        "transition-colors ease-default duration-200",
      )}
      href={"/"}
    >
      <MeadowFreshSmall />
      <Cow />
      <div className="text-[10px] absolute top-1.5 left-1.5">M</div>
      <div className="text-[10px] absolute top-1.5 right-1.5">F</div>
      <div className="text-[10px] absolute bottom-1.5 left-1.5">F</div>
      <div className="text-[10px] absolute bottom-1.5 right-1.5">H</div>
    </Link>
  );
};

export const SidebarButtonRender: React.FC<{
  label: string;
  icon: IconType;
  selected?: boolean;
  className?: string;
}> = ({ label, icon, selected, className }) => {
  return (
    <div
      className={cn(
        "w-20 h-20 flex flex-col items-center justify-center gap-2.5 bg-background hover:bg-muted/50 text-foreground",
        {
          "bg-primary hover:bg-primary/50 text-primary-foreground": selected,
          "bg-background hover:bg-muted/50 text-foreground": !selected,
        },
        "transition-colors ease-default duration-200",
        className,
      )}
    >
      <Icon
        type={icon}
        className={cn({
          "bg-primary-foreground ": selected,
          "bg-foreground": !selected,
        })}
      />
      <SidePanelButtonLabel>{label}</SidePanelButtonLabel>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const { isLoggedIn } = useUserStore();

  // const pathName = typeof window !== "undefined" ? window.location.pathname : "";
  const path = usePathname();

  const isSelected = () => {
    return (
      path === "/herd" ||
      path === "/transfers" ||
      path === "/leagues" ||
      path === "/results" ||
      path === "/scan" ||
      path === "/prizes" ||
      path === "/help" ||
      path === "/user"
    );
  };

  return (
    <header className="w-fit h-full border-r flex flex-col items-center justify-between z-50">
      <div>
        <SidebarLogo selected={!isSelected()} />
        <hr />
        {isLoggedIn && (
          <>
            <Link href={"/herd"}>
              <SidebarButtonRender
                label={"Herd"}
                icon={"grass"}
                selected={path === "/herd"}
              />
            </Link>
            <Link href={"/transfers"}>
              <SidebarButtonRender
                label={"Transfer"}
                icon={"transfer"}
                selected={path === "/transfers"}
              />
            </Link>
          </>
        )}
        <Link href={"/leagues"}>
          <SidebarButtonRender
            label={"Leagues"}
            icon={"stats"}
            selected={path === "/leagues"}
          />
        </Link>
        <Link href={"/results"}>
          <SidebarButtonRender
            label={"Results"}
            icon={"timeline"}
            selected={path === "/results"}
          />
        </Link>
        <hr />
        <Link href={"/scan"}>
          <SidebarButtonRender
            label={"Scan"}
            icon={"scan"}
            selected={path === "/scan"}
          />
        </Link>
        <Link href={"/prizes"}>
          <SidebarButtonRender
            label={"Prizes"}
            icon={"trophy"}
            selected={path === "/prizes"}
          />
        </Link>
        <Link href={"/help"}>
          <SidebarButtonRender
            label={"Help"}
            icon={"help"}
            selected={path === "/help"}
          />
        </Link>
        <hr />
      </div>
      <div>
        <ThemeButton />
        <Link href={"/user"}>
          <SidebarButtonRender
            label={"user"}
            icon={"user"}
            selected={path === "/user"}
          />
        </Link>
      </div>
    </header>
  );
};
