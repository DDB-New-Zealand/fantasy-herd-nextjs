"use client";

import { DetailDrawer } from "@/components/cow/detail-drawer";
import { CowDraggableCardPlaceHolder } from "@/components/cow/draggable-cards";
import { CowRow } from "@/components/cow/row";
import { Rating } from "@/components/rating";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import Placeholder from "@/components/ui/placeholder";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  PageTitle,
  PlayerAreaLabel,
  TableListHeader,
} from "@/components/ui/typography";
import { Wallet } from "@/components/wallet";
import { cn } from "@/lib/utils";
import { UserProvider } from "@/stores/user-store";
import { useState } from "react";

type CowData = {
  id: string;
  name: string;
  price: number;
  rating: Rating;
};

const COW_DATA: CowData[] = [
  {
    id: "1",
    name: "Bessie",
    price: 12,
    rating: "A+",
  },
  {
    id: "2",
    name: "MooMoo",
    price: 8,
    rating: "B",
  },
  {
    id: "3",
    name: "Milkwood",
    price: 19,
    rating: "C",
  },
  {
    id: "4",
    name: "LongHoonss",
    price: 19,
    rating: "C",
  },
];

export default function HerdPage() {
  const [cow, setCow] = useState<CowData | null>(null);
  const [benchedCows, setBenchedCows] = useState<CowData[]>([]);

  return (
    <div className="w-full h-full">
      <ResizablePanelGroup
        minSize={[380, 900]}
        maxSize={[600, undefined]}
        defaultSize={[450, undefined]}
      >
        <ResizablePanel index={0}>
          <div className="w-full h-full max-h-full overflow-y-auto p-6 pr-[25px]">
            <PageTitle>Cow Select</PageTitle>
            <Field className="mt-6">
              <FieldLabel>Find a cow</FieldLabel>
              <div className="relative">
                <Input placeholder="Search by name, num, price or rating" />
                <Icon
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  type={"search"}
                />
              </div>
            </Field>
            <div className="mt-6">
              <div
                className={cn(
                  "w-full grid grid-cols-[1fr_auto_auto]",
                  "[&>*:nth-child(3n-2)]:border-r [&>*:nth-child(3n-2)]:border-b",
                  "[&>*:nth-child(3n-1)]:border-r [&>*:nth-child(3n-1)]:border-b",
                  "[&>*:nth-child(3n)]:border-b",
                )}
              >
                <TableListHeader className="h-[26px] flex items-center">
                  Name
                </TableListHeader>
                <TableListHeader className="h-[26px] flex items-center">
                  <div className="pl-3">Price</div>
                </TableListHeader>
                <TableListHeader className="h-[26px] flex items-center">
                  <div className="pl-3">Rating</div>
                </TableListHeader>

                {COW_DATA.map((cow) => {
                  return (
                    <CowRow
                      key={cow.id}
                      name={cow.name}
                      price={cow.price}
                      rating={cow.rating}
                      onClickDetail={() => {
                        setCow(cow);
                      }}
                      onAdd={() => {
                        setBenchedCows((prev) => [...prev, cow]);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel index={1}>
          <div className="w-full h-full pl-[12px] flex flex-col">
            <div className="w-full h-[calc(100%-240px)] relative border-b border-l">
              <Placeholder className="absolute inset-0 w-full h-full bg-moss-green"></Placeholder>
              <div className="absolute inset-0 p-6">
                <div className="w-full flex items-center justify-between">
                  <PageTitle className="text-grey">Your Herd</PageTitle>
                  <Wallet />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-1/2"></div>
              </div>
              <div className="absolute bottom-0 left-6 right-6 h-[522px] pointer-events-none">
                <div
                  className="w-full h-full border-l border-r border-transparent bg-gradient-to-t from-white/24 to-transparent"
                  style={{
                    backgroundClip: "border-box",
                    mask: "linear-gradient(white 0 0) padding-box, linear-gradient(white 0 0)",
                    maskClip: "padding-box, border-box",
                    maskComposite: "exclude",
                  }}
                ></div>
              </div>
            </div>
            <div className="relative w-full h-[240px] px-6">
              <div className="flex items-center justify-center gap-3 mt-6 px-6">
                <CowDraggableCardPlaceHolder />
                <CowDraggableCardPlaceHolder />
                <CowDraggableCardPlaceHolder />
                <CowDraggableCardPlaceHolder />
                <CowDraggableCardPlaceHolder />
              </div>
              <div className="flex gap-3 items-center justify-center mt-9">
                <Button variant={"outline"} className="border-foreground/24">
                  Auto pick
                </Button>
                <Button
                  variant={"outline"}
                  className="border-foreground/24"
                  disabled
                >
                  Reset
                </Button>
                <Button
                  variant={"outline"}
                  className="border-foreground/24"
                  disabled
                >
                  Enter Herd
                </Button>
              </div>
              <div className="absolute left-[25px] right-6 bottom-[92px] top-0 pointer-events-none border-x border-b"></div>
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-background border h-[26px] px-3">
                <PlayerAreaLabel>Benched 1/5</PlayerAreaLabel>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <UserProvider isLoggedIn />
      <DetailDrawer
        open={!!cow}
        setOpen={(open) => {
          if (!open) setCow(null);
        }}
      />
    </div>
  );
}
