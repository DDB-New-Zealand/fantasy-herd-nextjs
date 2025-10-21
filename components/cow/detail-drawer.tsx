import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
} from "../ui/cow-detail-sheet";
import { Button } from "../ui/button";
import {
  PlayerDetailCarouselLabel,
  PlayerDetailLabel,
  PlayerDetailTableHeader,
  PlayerDetailTableLabel,
  PlayerDetailTableValue,
  PlayerDetailTitle,
  PlayerDetailValue,
  SummaryValue,
} from "../ui/typography";
import Placeholder from "../ui/placeholder";
import { Price } from "../price";
import { Rating } from "../rating";
import Icon from "../ui/icon";
import { useEffect, useState } from "react";
import { CowData } from "@/app/(experience)/herd/page";
import { delay } from "motion";

type Props = {
  selectedData: CowData | null;
  setOpen: (open: boolean) => void;
};

const P_DATA = [
  {
    label: "P Data 1",
    value: 120.5,
  },

  {
    label: "P Data 2",
    value: 120.5,
  },
  {
    label: "P Data 3",
    value: 120.5,
  },
  {
    label: "P Data 4",
    value: 120.5,
  },

  {
    label: "Total Performance",
    value: 120.5,
  },
];

export const DetailDrawer: React.FC<Props> = (props) => {
  const { selectedData, setOpen } = props;

  const [data, setData] = useState<CowData | null>(selectedData);
  useEffect(() => {
    if (selectedData) setData(selectedData);
  }, [selectedData]);

  return (
    <Sheet
      open={!!selectedData}
      onOpenChange={(open) => {
        delay(() => {
          setData(null);
        }, 0.3);
        setOpen(open);
      }}
    >
      <SheetPortal>
        <SheetOverlay onClick={(e) => {}}>
          <div className="absolute inset-0 bg-primary text-primary-foreground flex items-center justify-center">
            CARDS GOES HERE
          </div>
        </SheetOverlay>
        <SheetContent
          className="gap-0"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          {data && (
            <>
              <SheetHeader>
                <SheetTitle>COW DETAILS</SheetTitle>
              </SheetHeader>
              <div className="px-6">
                <div className="border w-full rounded-[6px] pt-3 px-3">
                  <PlayerDetailLabel className="block mb-[6px]">
                    {"cow surname"}
                  </PlayerDetailLabel>
                  <div className="flex justify-between items-center">
                    <div>
                      <PlayerDetailTitle className="flex gap-3">
                        {data.name}
                        <Placeholder className="w-[34px] h-[34px]" />
                      </PlayerDetailTitle>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center">
                        <PlayerDetailValue className="[&_svg]:mt-0.5 block">
                          <Price>{data.price}</Price>
                        </PlayerDetailValue>
                        <PlayerDetailLabel>PRICE</PlayerDetailLabel>
                      </div>
                      <div className="border-r h-[33px]" />
                      <div className="flex flex-col items-center justify-center">
                        <Rating size="lg" rating={data.rating} />
                      </div>
                    </div>
                  </div>
                  <hr className="mt-3 -mx-3" />
                  <div className="-mx-3 flex items-center justify-center">
                    <button
                      type="button"
                      className="w-9 h-9 flex items-center justify-center border-r"
                    >
                      <Icon type="chevron" className="w-5 h-5" />
                    </button>
                    <div className="grow flex items-center justify-center">
                      <PlayerDetailCarouselLabel>1/5</PlayerDetailCarouselLabel>
                    </div>

                    <button
                      type="button"
                      className="w-9 h-9 flex items-center justify-center border-l"
                    >
                      <Icon type="chevron" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <table className="w-full mt-4 table-fixed [&_tr]:border-b [&_td]:nth-[1]:border-r">
                  <thead>
                    <tr className="border-b h-[20px]">
                      <th className="text-left border-r w-1/2">
                        <PlayerDetailTableHeader>Stat</PlayerDetailTableHeader>
                      </th>
                      <th className="text-left w-1/2 px-3">
                        <PlayerDetailTableHeader>Value</PlayerDetailTableHeader>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {P_DATA.map((data) => (
                      <tr key={data.label}>
                        <td>
                          <PlayerDetailTableLabel>
                            {data.label}
                          </PlayerDetailTableLabel>
                        </td>
                        <td className="text-left px-3 py-2 flex items-center gap-1.5">
                          <Placeholder className="w-[10px] h-[13px]" />
                          <PlayerDetailTableValue>
                            {data.value}
                          </PlayerDetailTableValue>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex">
                  <button
                    type="button"
                    className="flex items-center justify-center w-9 h-9 border-r"
                  >
                    <Icon type="chevron" className="w-5 h-5" />
                  </button>
                  <div className="grow flex items-center justify-center">
                    <PlayerDetailCarouselLabel>
                      Preseason
                    </PlayerDetailCarouselLabel>
                  </div>
                  <button
                    type="button"
                    className="flex items-center justify-center w-9 h-9 border-l"
                  >
                    <Icon type="chevron" className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <SheetFooter>
                <Button variant="outline">
                  Move To Bench
                  <Icon type="transfer" className="w-5 h-5 inline-block" />
                </Button>

                <Button variant="secondary">
                  REMOVE FROM HERD
                  <Icon
                    type="transfer"
                    className="w-5 h-5 inline-block bg-white"
                  />
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
};
