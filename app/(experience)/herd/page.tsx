"use client";

import { DetailDrawer } from "@/components/cow/detail-drawer";
import {
  CowDraggableCard,
  CowDraggableCardField,
  CowDraggableCardPlaceHolder,
  CowDraggableCardPlaceHolderField,
} from "@/components/cow/draggable-cards";
import { EnterHerdDrawer } from "@/components/enter-herd-drawer";
import { Button } from "@/components/ui/button";
import Placeholder from "@/components/ui/placeholder";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PageTitle, PlayerAreaLabel } from "@/components/ui/typography";
import { Wallet } from "@/components/wallet";
import useUserStore, { UserProvider } from "@/stores/user-store";
import { useState } from "react";
import CowSelect from "./pre-season/cow-select";
import Summary from "./pre-season/summary";
import Icon from "@/components/ui/icon";

export default function HerdPage() {
  const {
    herd,
    autoPickHerd,
    resetHerd,
    enterHerd,
    currentSeason,
    herdEntered,
  } = useUserStore();

  const [openEnterHerd, setOpenEnterHerd] = useState(false);

  const benchedCows = Object.keys(herd)
    .filter((key) => {
      if (key.startsWith("benched-")) {
        return herd[key as keyof typeof herd] !== undefined;
      }

      return false;
    })
    .map((key) => {
      return herd[key as keyof typeof herd];
    })
    .filter((key) => key !== undefined);
  const starterCows = Object.keys(herd)
    .filter((key) => {
      if (key.startsWith("starter-")) {
        return herd[key as keyof typeof herd] !== undefined;
      }

      return false;
    })
    .map((key) => {
      return herd[key as keyof typeof herd];
    })
    .filter((key) => key !== undefined);

  const hasSelected = benchedCows.length + starterCows.length > 0;
  const hasHerdFilled = starterCows.length === 5 && benchedCows.length === 5;

  return (
    <div className="relative w-full h-full">
      <ResizablePanelGroup
        key={"herd-page-resizable-group"}
        minSize={[380, 900]}
        maxSize={[600, undefined]}
        defaultSize={[450, undefined]}
      >
        <ResizablePanel index={0}>
          {currentSeason === "pre-season" && !herdEntered && <CowSelect />}
          {currentSeason === "pre-season" && herdEntered && <Summary />}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel index={1}>
          <div className="w-full h-full pl-[12px] flex flex-col">
            <div className="w-full h-[calc(100%-240px)] relative border-b border-l">
              <Placeholder className="absolute inset-0 w-full h-full bg-moss-green"></Placeholder>
              <div className="absolute inset-0 p-6 grid grid-cols-1 grid-rows-[auto_1fr]">
                <div className="w-full flex items-center justify-between">
                  <PageTitle className="text-grey">Your Herd</PageTitle>
                  <Wallet />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <PlayerAreaLabel asChild>
                    <div className="bg-background border h-[26px] px-3 w-fit flex items-center">
                      Starters {starterCows.length}/5
                    </div>
                  </PlayerAreaLabel>
                  <div className="mt-9">
                    <div className="flex items-center justify-center gap-12">
                      {herd["starter-1"] ? (
                        <CowDraggableCardField cow={herd["starter-1"]} />
                      ) : (
                        <CowDraggableCardPlaceHolderField />
                      )}
                      {herd["starter-2"] ? (
                        <CowDraggableCardField cow={herd["starter-2"]} />
                      ) : (
                        <CowDraggableCardPlaceHolderField />
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-12 mt-3.5">
                      {herd["starter-3"] ? (
                        <CowDraggableCardField cow={herd["starter-3"]} />
                      ) : (
                        <CowDraggableCardPlaceHolderField />
                      )}
                      {herd["starter-4"] ? (
                        <CowDraggableCardField
                          cow={herd["starter-4"]}
                          className=" translate-y-[22px]"
                        />
                      ) : (
                        <CowDraggableCardPlaceHolderField className=" translate-y-[22px]" />
                      )}
                      {herd["starter-5"] ? (
                        <CowDraggableCardField cow={herd["starter-5"]} />
                      ) : (
                        <CowDraggableCardPlaceHolderField />
                      )}
                    </div>
                  </div>
                  <div></div>
                </div>
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
                {herd["benched-1"] ? (
                  <CowDraggableCard cow={herd["benched-1"]} />
                ) : (
                  <CowDraggableCardPlaceHolder />
                )}
                {herd["benched-2"] ? (
                  <CowDraggableCard cow={herd["benched-2"]} />
                ) : (
                  <CowDraggableCardPlaceHolder />
                )}
                {herd["benched-3"] ? (
                  <CowDraggableCard cow={herd["benched-3"]} />
                ) : (
                  <CowDraggableCardPlaceHolder />
                )}
                {herd["benched-4"] ? (
                  <CowDraggableCard cow={herd["benched-4"]} />
                ) : (
                  <CowDraggableCardPlaceHolder />
                )}
                {herd["benched-5"] ? (
                  <CowDraggableCard cow={herd["benched-5"]} />
                ) : (
                  <CowDraggableCardPlaceHolder />
                )}
              </div>
              <div className="flex gap-3 items-center justify-center mt-9">
                {currentSeason === "pre-season" && !herdEntered && (
                  <>
                    <Button
                      variant={"outline"}
                      className="border-foreground/24"
                      onClick={() => {
                        autoPickHerd();
                      }}
                    >
                      Auto pick
                    </Button>
                    <Button
                      variant={"outline"}
                      className="border-foreground/24"
                      disabled={!hasSelected}
                      onClick={() => {
                        resetHerd();
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      variant={"outline"}
                      className="border-foreground/24"
                      disabled={!hasHerdFilled}
                      onClick={() => {
                        setOpenEnterHerd(true);
                      }}
                    >
                      Enter Herd
                    </Button>
                  </>
                )}
                {currentSeason === "pre-season" && herdEntered && (
                  <>
                    <Button
                      variant={"outline"}
                      className="border-foreground/24"
                      disabled={!hasSelected}
                      onClick={() => {
                        // resetHerd();
                      }}
                    >
                      Share your herd <Icon type="share" />
                    </Button>
                    <Button
                      variant={"outline"}
                      className="border-foreground/24"
                      disabled={!hasHerdFilled}
                      onClick={() => {
                        // setOpenEnterHerd(true);
                      }}
                    >
                      Edit your picks <Icon type="edit" />
                    </Button>
                  </>
                )}
              </div>
              <div className="absolute left-[25px] right-6 bottom-[92px] top-0 pointer-events-none border-x border-b"></div>
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-background border h-[26px] px-3">
                <PlayerAreaLabel>
                  Benched {benchedCows.length}/5
                </PlayerAreaLabel>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <DetailDrawer />
      <EnterHerdDrawer
        open={openEnterHerd}
        onClose={() => {
          setOpenEnterHerd(false);
        }}
        onSubmit={(text) => {
          enterHerd(text);

          setOpenEnterHerd(false);
        }}
      />
    </div>
  );
}
