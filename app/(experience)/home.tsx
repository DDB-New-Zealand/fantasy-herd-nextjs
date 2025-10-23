import Halter from "@/app/assets/logo/halter.svg";
import LIC from "@/app/assets/logo/lic.svg";
import MeadowFresh from "@/app/assets/logo/meadow_fresh.png";
import { Banner } from "@/components/banner";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import {
  HomeFooter,
  HomeParagraph,
  HomeTitle,
} from "@/components/ui/typography";
import { WeatherWidget } from "@/components/weather";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full grid grid-cols-2">
      <div className="flex flex-col p-5 justify-between items-center">
        <div className="flex w-full gap-3">
          <Banner className="grow">
            Gameweek 1
            <Icon type="time" className="w-[18px] h-[18px]" />
            Sat 16, Aug 05:30
          </Banner>
          <Banner muted>GW2</Banner>
          <Banner muted>GW3</Banner>
          <Banner muted>GW4</Banner>
          <Banner muted>GW5</Banner>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image src={MeadowFresh} alt="" />
          <HomeTitle className="mt-12">
            {`Register to play 
            fantasy herd`}
          </HomeTitle>
          <HomeParagraph className="mt-6">
            {`THE WORLDS FIRST FANTASY
            SPORTS COW TRADING GAME`}
          </HomeParagraph>
          <div className="mt-12 mb-6 flex items-center justify-center gap-3">
            <Link href={"/sign-in"}>
              <Button variant={"pattern"} size={"fixed"} asChild>
                Sign in
              </Button>
            </Link>
            <Button variant={"outline-hard"} size={"fixed"} asChild>
              <Link href={"/sign-up"}>Register Now</Link>
            </Button>
          </div>
        </div>
        <div>
          <HomeFooter>Real cow data powered by</HomeFooter>
          <div className="flex items-center gap-5 mt-[14px]">
            <Halter /> & <LIC />
          </div>
        </div>
      </div>
      <div className="bg-primary/50 p-5">
        <WeatherWidget
          className="absolute right-5 top-5"
          country={"NZ"}
          city={"Waikato"}
          region={"AUK"}
        />
      </div>
    </div>
  );
}
