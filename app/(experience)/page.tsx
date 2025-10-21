import { Banner } from "@/components/banner";
import Icon from "@/components/ui/icon";
import {
  HomeFooter,
  HomeParagraph,
  HomeTitle,
} from "@/components/ui/typography";
import Halter from "@/app/assets/logo/halter.svg";
import LIC from "@/app/assets/logo/lic.svg";
import MeadowFresh from "@/app/assets/logo/meadow_fresh.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { WeatherWidget } from "@/components/weather";
import Link from "next/link";
import { UserProvider } from "@/stores/user-store";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    country: string | undefined;
    city: string | undefined;
    region: string | undefined;
  }>;
}) {
  const params = await searchParams;

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
              <Link href={"/register"}>Register Now</Link>
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
          country={params.country || "NZ"}
          city={params.city || "Auckland"}
          region={params.region || "AUK"}
        />
      </div>
      <UserProvider isLoggedIn={false} />
    </div>
  );
}
