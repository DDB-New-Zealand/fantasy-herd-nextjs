"use client";

import Cow from "@/app/assets/logo/cow.svg";
import MeadowFreshSmall from "@/app/assets/logo/meadow_fresh_small.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Icon, { IconType } from "./ui/icon";
import { SidePanelButtonLabel } from "./ui/typography";
import { Slot } from "@radix-ui/react-slot";
import { ThemeButton } from "./theme-button";
import useUserStore from "@/stores/user-store";

export const SidebarLogo: React.FC = () => {
  return (
    <Link
      className="relative w-20 py-[22px] px-1.5 bg-primary flex flex-col items-center justify-center gap-3"
      href={"/"}
    >
      <MeadowFreshSmall />
      <Cow />
      <div className="text-deep-green text-[10px] absolute top-1.5 left-1.5">
        M
      </div>
      <div className="text-deep-green text-[10px] absolute top-1.5 right-1.5">
        F
      </div>
      <div className="text-deep-green text-[10px] absolute bottom-1.5 left-1.5">
        F
      </div>
      <div className="text-deep-green text-[10px] absolute bottom-1.5 right-1.5">
        H
      </div>
    </Link>
  );
};

export const SidebarButtonRender: React.FC<{
  label: string;
  icon: IconType;
  className?: string;
}> = ({ label, icon, className }) => {
  return (
    <div
      className={cn(
        "w-20 h-20 flex flex-col items-center justify-center gap-2.5 bg-transparent hover:bg-muted/50 text-foreground",
        "transition-colors ease-default duration-200",
        className,
      )}
    >
      <Icon type={icon} className="" />
      <SidePanelButtonLabel>{label}</SidePanelButtonLabel>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const { isLoggedIn } = useUserStore();

  return (
    <header className="w-fit h-full border-r flex flex-col items-center justify-between">
      <div>
        <SidebarLogo />
        <hr />
        {isLoggedIn && (
          <>
            <Link href={"/herd"}>
              <SidebarButtonRender label={"Herd"} icon={"grass"} />
            </Link>
            <Link href={"/transfers"}>
              <SidebarButtonRender label={"Transfer"} icon={"transfer"} />
            </Link>
          </>
        )}
        <Link href={"/leagues"}>
          <SidebarButtonRender label={"Leagues"} icon={"stats"} />
        </Link>
        <Link href={"/results"}>
          <SidebarButtonRender label={"Results"} icon={"timeline"} />
        </Link>
        <hr />
        <Link href={"/scan"}>
          <SidebarButtonRender label={"Scan"} icon={"scan"} />
        </Link>
        <Link href={"/prizes"}>
          <SidebarButtonRender label={"Prizes"} icon={"trophy"} />
        </Link>
        <Link href={"/help"}>
          <SidebarButtonRender label={"Help"} icon={"help"} />
        </Link>
        <hr />
      </div>
      <div>
        <ThemeButton />
        <Link href={"/user"}>
          <SidebarButtonRender label={"user"} icon={"user"} />
        </Link>
      </div>
    </header>
  );
};
