"use client";

import { cn } from "@/lib/utils";
import { Price } from "../price";
import { Rating } from "../rating";
import Icon from "../ui/icon";
import Placeholder from "../ui/placeholder";
import { TableListTitle, TableValue } from "../ui/typography";

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
    <>
      <TableListTitle className="flex gap-3 items-center w-full" asChild>
        <button
          type="button"
          className=""
          onClick={(e) => {
            e.preventDefault();

            onClickDetail();
          }}
        >
          <Placeholder className="w-[45px] h-[45px]" />
          <div className="flex items-center justify-between grow mr-3">
            {name}
            <Placeholder className="w-[24px] h-[24px]" />
          </div>
        </button>
      </TableListTitle>
      <TableValue asChild>
        <button
          type="button"
          className=""
          onClick={(e) => {
            e.preventDefault();

            onClickDetail();
          }}
        >
          <div className="pl-3 flex items-center min-w-[68px]">
            <Price>{price}</Price>
          </div>
        </button>
      </TableValue>
      <div className="relative flex items-center">
        <TableValue asChild>
          <button
            type="button"
            className=""
            onClick={(e) => {
              e.preventDefault();

              onClickDetail();
            }}
          >
            <div className="pl-3">
              <div className="w-fit flex items-center">
                <Rating rating={rating} />
                <div className="w-[20px] h-[20px]  ml-3"></div>
              </div>
            </div>
          </button>
        </TableValue>
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-0 w-[20px] h-[20px]"
          onClick={(e) => {
            e.preventDefault();

            onAdd();
          }}
        >
          <Icon
            className={cn("w-[20px] h-[20px] inline-block", {
              "rotate-180": added,
            })}
            type={"plus"}
          />
        </button>
      </div>
    </>
  );
};
