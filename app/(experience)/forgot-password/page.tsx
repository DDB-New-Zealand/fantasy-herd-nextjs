import { isUserLoggedInServer } from "@/lib/cookie";
import { redirect } from "next/navigation";
import ForgotPasswordPage from "./forgot-password";

type Props = {
  searchParams: Promise<{
    redirect?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const { redirect: redirectPath } = await searchParams;

  const isLoggedIn = await isUserLoggedInServer();

  if (isLoggedIn) {
    redirect(redirectPath || "/");
  }

  return <ForgotPasswordPage />;
}
