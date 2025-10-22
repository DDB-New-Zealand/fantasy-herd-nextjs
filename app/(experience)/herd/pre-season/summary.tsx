import { Banner } from "@/components/banner";
import Icon from "@/components/ui/icon";
import Placeholder from "@/components/ui/placeholder";
import {
  PageTitle,
  SummaryDescription,
  SummaryLabel,
  SummaryValue,
  SummaryValueLabel,
} from "@/components/ui/typography";
import useUserStore from "@/stores/user-store";

export default function Summary() {
  const { herdName, userName } = useUserStore();

  return (
    <div className="w-full h-full max-h-full overflow-y-auto p-6 pr-[25px]">
      <div className="border">
        <div className="bg-primary text-primary-foreground p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <PageTitle>{herdName}</PageTitle>
            <div className="flex">
              <SummaryValue>0</SummaryValue>
              <SummaryValueLabel className="mt-0.5">pts</SummaryValueLabel>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-center justify-center gap-2.5">
              {/* Flag */}
              <Placeholder className="w-[28px] h-[22px]" />
              <SummaryLabel>{userName}</SummaryLabel>
            </div>
            <div>
              <Placeholder className="w-[38px] h-[38px]" />
            </div>
          </div>
        </div>
        <div className="border-t bg-background relative p-5">
          <div className="absolute inset-0 bg-black/2"></div>
          <SummaryDescription>
            Your all set! Check back Once gameweek 1 starts to see how your herd
            stacks up against the rest.
          </SummaryDescription>
          <Banner className="mt-6">
            Gameweek 1
            <Icon type="time" className="w-[18px] h-[18px]" />
            Sat 16, Aug 05:30
          </Banner>
        </div>
      </div>
    </div>
  );
}
