import { Price } from "./price";
import Placeholder from "./ui/placeholder";
import { WalletPriceLabel } from "./ui/typography";

export const Wallet = () => {
  return (
    <div className="bg-primary text-primary-foreground h-8 flex items-center justify-center px-[10px]">
      <div className="w-[36px] relative">
        <Placeholder className="w-[48px] h-[37px] bg-white absolute -top-1/2 -translate-y-1/2 -rotate-3 -translate-x-4"></Placeholder>
      </div>
      <WalletPriceLabel asChild>
        <Price>45</Price>
      </WalletPriceLabel>
    </div>
  );
};
