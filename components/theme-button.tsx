"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { SidebarButtonRender } from "./sidebar";
import { Command, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Icon from "./ui/icon";

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger className={cn(`data-[state=open]:bg-muted/50`)}>
        <SidebarButtonRender
          label={theme === "dark" ? "Light" : "Dark"}
          icon={theme === "dark" ? "light" : "dark"}
        />
      </PopoverTrigger>
      <PopoverContent
        className="w-fit p-1"
        side="top"
        align="start"
        alignOffset={24}
      >
        <Command value={theme}>
          <CommandList>
            <CommandItem
              className="px-2"
              onSelect={() => {
                setTheme("light");
              }}
            >
              <Icon type="light" className="w-[18px] h-[18px] mr-2" />
              Light
            </CommandItem>
            <CommandItem
              className="px-2"
              onSelect={() => {
                setTheme("dark");
              }}
            >
              <Icon type="dark" className="w-[18px] h-[18px] mr-2" />
              Dark
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
