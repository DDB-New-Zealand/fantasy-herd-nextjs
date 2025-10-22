"use client";

import { cn } from "@/lib/utils";
import { Price } from "../price";
import { Rating } from "../rating";
import Icon from "../ui/icon";
import Placeholder from "../ui/placeholder";
import { TableListTitle, TableValue } from "../ui/typography";
import { useCowDetailStore } from "@/stores/cow-detail-store";

type Props = {
  name: string;
  price: number;
  rating: Rating;
  added?: boolean;
  onClickDetail: () => void;
  onAdd: () => void;
};

export const CowRow: React.FC<Props> = ({
  name,
  price,
  rating,
  added,
  onClickDetail,
  onAdd,
}) => {
  return (
    <tr
      className={cn({
        "bg-black/4 dark:bg-black/24": added,
      })}
      onClick={(e) => {
        e.preventDefault();

        onClickDetail();
      }}
    >
      <TableListTitle className="flex gap-3 items-center w-full" asChild>
        <td>
          <Placeholder className="w-[45px] h-[45px]" />
          <div className="flex items-center justify-between grow mr-3">
            {name}
            <Placeholder className="w-[24px] h-[24px]" />
          </div>
        </td>
      </TableListTitle>
      <TableValue asChild>
        <td>
          <div className="pl-3 flex items-center min-w-[68px]">
            <Price>{price}</Price>
          </div>
        </td>
      </TableValue>
      <td>
        <div className="relative flex items-center">
          <TableValue asChild>
            <div className="pl-3">
              <div className="w-fit flex items-center">
                <Rating size="table" rating={rating} />
                <div className="w-[20px] h-[20px]  ml-3"></div>
              </div>
            </div>
          </TableValue>
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-0 w-[20px] h-[20px]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              onAdd();
            }}
          >
            <Icon
              className={cn(
                "w-[20px] h-[20px] inline-block",
                "transition-transform duration-200 ease-default",
                {
                  "rotate-45": added,
                },
              )}
              type={"plus"}
            />
          </button>
        </div>
      </td>
    </tr>
  );
};
