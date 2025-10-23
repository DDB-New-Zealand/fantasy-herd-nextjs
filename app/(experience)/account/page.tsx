import { isUserLoggedInServer } from "@/lib/cookie";
import { redirect } from "next/navigation";
import AccountSettingsPage from "./account-settings";

export default async function Page() {
  const isLoggedIn = await isUserLoggedInServer();

  if (!isLoggedIn) {
    redirect("/");
  }

  return <AccountSettingsPage />;
}
