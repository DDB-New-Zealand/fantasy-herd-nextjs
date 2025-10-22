"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Debug: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger className="absolute right-2 bottom-2 bg-foreground w-4 h-4 rounded-full"></PopoverTrigger>
      <PopoverContent
        className="p-2"
        side="top"
        align="end"
        sideOffset={4}
        alignOffset={24}
      >
        <Button onClick={() => {}}>NEXT SEASON</Button>
      </PopoverContent>
    </Popover>
  );
};

export default Debug;
