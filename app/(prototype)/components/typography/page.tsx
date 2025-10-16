"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BannerLabel,
  ButtonLabel,
  ButtonLabelSmall,
  CheckCardDescription,
  CheckCardTitle,
  FieldLabel,
  HelperLabel,
  HomeFooter,
  HomeParagraph,
  HomeTitle,
  PageDescription,
  PageTitle,
  PaginationLabel,
  PaginationValue,
  PlayerAreaLabel,
  PlayerCardTitle,
  PlayerCardValue,
  PlayerCardViewHelperLabel,
  PlayerDetailCarouselLabel,
  PlayerDetailLabel,
  PlayerDetailTableHeader,
  PlayerDetailTableLabel,
  PlayerDetailTableValue,
  PlayerDetailTitle,
  PlayerDetailValue,
  PlayerDetailValueLabel,
  SidePanelButtonLabel,
  SummaryDescription,
  SummaryLabel,
  SummarySectionTitle,
  SummaryTableHeader,
  SummaryTableLabel,
  SummaryTableLabelBig,
  SummaryTableValue,
  SummaryTableValueSmall,
  SummaryValue,
  SummaryValueLabel,
  TableListHeader,
  TableListTitle,
  TableValue,
  WeatherLabel,
  WeatherValue,
  WeatherWidgetTitle,
} from "@/components/ui/typography";
import { useTheme } from "next-themes";

const Page = () => {
  const { theme, systemTheme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-12 h-svh relative">
      <div className="relative col-start-1 col-end-10 p-6 flex flex-col">
        <BannerLabel>Banner Label - GAME WEEK 1</BannerLabel>
        <HomeTitle>
          {`Home Title
          Fantasy Herd`}
        </HomeTitle>
        <HomeParagraph>
          Home paragraph - Lorem ipsum dolor sit amet, consectetur
        </HomeParagraph>
        <HomeFooter>Home footer</HomeFooter>
        <SidePanelButtonLabel>Side panel button label</SidePanelButtonLabel>
        <WeatherWidgetTitle>Weather Widget Title</WeatherWidgetTitle>
        <WeatherLabel>Weather Label</WeatherLabel>
        <WeatherValue>Weather Value - 19°</WeatherValue>
        <ButtonLabel>Button Label</ButtonLabel>
        <ButtonLabelSmall>Button Label Small</ButtonLabelSmall>
        <PageTitle>Page Title - Welcome to Fantasy herd,.</PageTitle>
        <PageDescription>
          Page description - Lorem ipsum dolor sit amet, consectetur
        </PageDescription>
        <CheckCardTitle>Check Card Title</CheckCardTitle>
        <CheckCardDescription>Check Card Description</CheckCardDescription>
        <TableListHeader>Table List Header</TableListHeader>
        <TableListTitle>Table List Title</TableListTitle>
        <TableValue>
          Table Value -
          <span className="inline-flex">
            12
            <svg
              className="mt-1"
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.03428 7.325C4.99142 7.41071 4.86285 7.41071 4.81999 7.325L3.04142 3.725C3.01999 3.67143 2.92356 3.67143 2.92356 3.75714V7.89286C2.92356 7.95714 2.88071 8 2.81642 8H1.74499C1.68071 8 1.63785 7.95714 1.63785 7.89286V0.607143C1.63785 0.542857 1.68071 0.5 1.74499 0.5H2.69857C2.77357 0.5 2.83785 0.532143 2.86999 0.607143L4.85214 4.56071C4.88428 4.63571 4.96999 4.63571 5.00214 4.56071L6.98428 0.607143C7.01642 0.532143 7.08071 0.5 7.15571 0.5H8.10928C8.17356 0.5 8.21642 0.542857 8.21642 0.607143V7.89286C8.21642 7.95714 8.17356 8 8.10928 8H7.03785C6.97356 8 6.93071 7.95714 6.93071 7.89286V3.75714C6.93071 3.67143 6.83428 3.67143 6.81285 3.725L5.03428 7.325Z"
                fill="#192319"
              />
              <path
                d="M0.0882119 5.12981C-0.0294045 5.12062 -0.0294037 4.94826 0.0882126 4.93907L4.98244 4.5567C4.9874 4.55632 4.99238 4.55632 4.99734 4.5567L9.89157 4.93907C10.0092 4.94826 10.0092 5.12062 9.89157 5.12981L4.99734 5.51217C4.99238 5.51256 4.9874 5.51256 4.98244 5.51217L0.0882119 5.12981Z"
                fill="#192319"
              />
            </svg>
          </span>
        </TableValue>
        <TableValue>Table Value - A+</TableValue>
        <PlayerAreaLabel>Player Area Label - 0/5</PlayerAreaLabel>
        <PlayerAreaLabel>Player Area Label - ADD COW</PlayerAreaLabel>
        <PlayerCardTitle>Player Card Title - DAISY</PlayerCardTitle>
        <PlayerCardValue>
          Player Card Value -
          <span className="inline-flex">
            12
            <svg
              className="mt-1"
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.03428 7.325C4.99142 7.41071 4.86285 7.41071 4.81999 7.325L3.04142 3.725C3.01999 3.67143 2.92356 3.67143 2.92356 3.75714V7.89286C2.92356 7.95714 2.88071 8 2.81642 8H1.74499C1.68071 8 1.63785 7.95714 1.63785 7.89286V0.607143C1.63785 0.542857 1.68071 0.5 1.74499 0.5H2.69857C2.77357 0.5 2.83785 0.532143 2.86999 0.607143L4.85214 4.56071C4.88428 4.63571 4.96999 4.63571 5.00214 4.56071L6.98428 0.607143C7.01642 0.532143 7.08071 0.5 7.15571 0.5H8.10928C8.17356 0.5 8.21642 0.542857 8.21642 0.607143V7.89286C8.21642 7.95714 8.17356 8 8.10928 8H7.03785C6.97356 8 6.93071 7.95714 6.93071 7.89286V3.75714C6.93071 3.67143 6.83428 3.67143 6.81285 3.725L5.03428 7.325Z"
                fill="#192319"
              />
              <path
                d="M0.0882119 5.12981C-0.0294045 5.12062 -0.0294037 4.94826 0.0882126 4.93907L4.98244 4.5567C4.9874 4.55632 4.99238 4.55632 4.99734 4.5567L9.89157 4.93907C10.0092 4.94826 10.0092 5.12062 9.89157 5.12981L4.99734 5.51217C4.99238 5.51256 4.9874 5.51256 4.98244 5.51217L0.0882119 5.12981Z"
                fill="#192319"
              />
            </svg>
          </span>
          A+
        </PlayerCardValue>
        <PlayerDetailLabel>Player Detail Label</PlayerDetailLabel>
        <PlayerDetailTitle>Player Detail Title - DAISY</PlayerDetailTitle>
        <PlayerDetailValue>
          Player Detail Value -
          <span className="inline-flex">
            12
            <svg
              className="mt-[7px]"
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.03428 7.325C4.99142 7.41071 4.86285 7.41071 4.81999 7.325L3.04142 3.725C3.01999 3.67143 2.92356 3.67143 2.92356 3.75714V7.89286C2.92356 7.95714 2.88071 8 2.81642 8H1.74499C1.68071 8 1.63785 7.95714 1.63785 7.89286V0.607143C1.63785 0.542857 1.68071 0.5 1.74499 0.5H2.69857C2.77357 0.5 2.83785 0.532143 2.86999 0.607143L4.85214 4.56071C4.88428 4.63571 4.96999 4.63571 5.00214 4.56071L6.98428 0.607143C7.01642 0.532143 7.08071 0.5 7.15571 0.5H8.10928C8.17356 0.5 8.21642 0.542857 8.21642 0.607143V7.89286C8.21642 7.95714 8.17356 8 8.10928 8H7.03785C6.97356 8 6.93071 7.95714 6.93071 7.89286V3.75714C6.93071 3.67143 6.83428 3.67143 6.81285 3.725L5.03428 7.325Z"
                fill="#192319"
              />
              <path
                d="M0.0882119 5.12981C-0.0294045 5.12062 -0.0294037 4.94826 0.0882126 4.93907L4.98244 4.5567C4.9874 4.55632 4.99238 4.55632 4.99734 4.5567L9.89157 4.93907C10.0092 4.94826 10.0092 5.12062 9.89157 5.12981L4.99734 5.51217C4.99238 5.51256 4.9874 5.51256 4.98244 5.51217L0.0882119 5.12981Z"
                fill="#192319"
              />
            </svg>
          </span>
        </PlayerDetailValue>
        <PlayerDetailValueLabel>
          Player Detail Value Label - Price
        </PlayerDetailValueLabel>
        <PlayerDetailCarouselLabel>
          Player Carousel Label - 1/5
        </PlayerDetailCarouselLabel>
        <PlayerDetailTableHeader>
          Player Detail Table Header
        </PlayerDetailTableHeader>
        <PlayerDetailTableLabel>
          Player Detail Table Label
        </PlayerDetailTableLabel>
        <PlayerDetailTableValue>
          Player Detail Table Value
        </PlayerDetailTableValue>
        <PlayerCardViewHelperLabel>Tap to flip</PlayerCardViewHelperLabel>
        <FieldLabel>Field Label</FieldLabel>
        <SummaryValue>Summary Value</SummaryValue>
        <SummaryValueLabel>Summary Value Label</SummaryValueLabel>
        <SummaryLabel>Summary Label</SummaryLabel>
        <SummaryDescription>Summary Description</SummaryDescription>
        <SummarySectionTitle>Summary Section Title</SummarySectionTitle>
        <SummaryTableHeader>Summary Table Header</SummaryTableHeader>
        <SummaryTableLabelBig>Summary Table Label Big</SummaryTableLabelBig>

        <SummaryTableLabel>Summary Table Label</SummaryTableLabel>
        <SummaryTableValue>Summary Table Value</SummaryTableValue>
        <SummaryTableValueSmall>
          Summary Table Value Small
        </SummaryTableValueSmall>
        <HelperLabel>Helper label</HelperLabel>
        <PaginationValue>Pagination Value</PaginationValue>
        <PaginationLabel>Pagination Label</PaginationLabel>
      </div>
      <div className="border-l border-black bg-white col-start-10 col-end-13 p-6 flex flex-col overflow-y-auto gap-3">
        <Select
          value={theme}
          onValueChange={(t) => {
            setTheme(t);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System ({systemTheme})</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Page;
