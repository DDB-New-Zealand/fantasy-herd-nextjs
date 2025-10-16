import Cow from "@/app/assets/logo/cow.svg";
import MeadowFreshSmall from "@/app/assets/logo/meadow_fresh_small.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Icon, { IconType } from "./ui/icon";
import { SidePanelButtonLabel } from "./ui/typography";

export const SidebarLogo: React.FC = () => {
  return (
    <Link
      className="relative w-20 py-[22px] px-1.5 bg-primary flex flex-col items-center justify-center gap-3"
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

export const SidebarButton: React.FC<{
  label: string;
  icon: IconType;
  href: string;
}> = ({ label, icon, href }) => {
  return (
    <Link
      className={cn(
        "w-20 h-20 flex flex-col items-center justify-center gap-2.5 hover:bg-muted/50",
        "transition-colors ease-in-out duration-300",
      )}
      href={href}
    >
      <Icon type={icon} className="" />
      <SidePanelButtonLabel>{label}</SidePanelButtonLabel>
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <header className="w-fit h-full border-r flex flex-col items-center justify-between">
      <div>
        <SidebarLogo />
        <hr />
        <SidebarButton label={"Leagues"} icon={"stats"} href={"/leagues"} />
        <SidebarButton label={"Results"} icon={"timeline"} href={"/results"} />
        <hr />
        <SidebarButton label={"Prizes"} icon={"trophy"} href={"/prizes"} />
        <SidebarButton label={"Help"} icon={"help"} href={"/help"} />
        <hr />
      </div>
      <SidebarButton label={"Dark"} icon={"dark"} href={"/theme"} />
    </header>
  );
};
