import { Banner } from "@/components/banner";
import { CheckCard } from "@/components/checkcard";
import Icon from "@/components/ui/icon";
import { PageDescription, PageTitle } from "@/components/ui/typography";
import { UserProvider } from "@/stores/user-store";

export default async function DashboardPage() {
  return (
    <div className="w-full h-full p-6 flex flex-col">
      <div>
        <PageTitle>Welcome to fantasy herd, User123</PageTitle>
        <PageDescription className="mt-6">
          Here’s some things to get you started!
        </PageDescription>
        <div className="w-full flex gap-3 mt-6">
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
      </div>
      <div className="grow mt-6 grid grid-cols-2 grid-rows-2 gap-6">
        <CheckCard
          title={"Build your herd"}
          description={
            "Use your budget of 100m (moolah) to build your ultimate Herd."
          }
          icon={"grass"}
          checked={false}
        />
        <CheckCard
          title={"Build your herd"}
          description={
            "Use your budget of 100m (moolah) to build your ultimate Herd."
          }
          icon={"timeline"}
          checked={true}
        />
        <CheckCard
          title={"Build your herd"}
          description={
            "Use your budget of 100m (moolah) to build your ultimate Herd."
          }
          icon={"stats"}
          checked={true}
        />
        <CheckCard
          title={"Build your herd"}
          description={
            "Use your budget of 100m (moolah) to build your ultimate Herd."
          }
          icon={"scan"}
          checked={false}
        />
      </div>

      <UserProvider isLoggedIn />
    </div>
  );
}
