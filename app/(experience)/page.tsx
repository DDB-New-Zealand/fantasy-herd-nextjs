import { isUserLoggedInServer } from "@/lib/cookie";
import Home from "./home";
import PreseasonDashboardPage from "./preseason-dashboard";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    country: string | undefined;
    city: string | undefined;
    region: string | undefined;
  }>;
}) {
  const logged = await isUserLoggedInServer();

  if (logged) {
    return <PreseasonDashboardPage />;
  }

  return <Home />;
}
