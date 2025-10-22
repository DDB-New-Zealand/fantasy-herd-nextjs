"use client";

import { Button } from "@/components/ui/button";
import { PageDescription, PageTitle } from "@/components/ui/typography";
import { loginUserServer } from "@/lib/cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SigninPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      loginUserServer();
      router.push("/");
    }, 1000);
  }, [router]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <PageTitle>Sign in page pending</PageTitle>
      <PageDescription>Redirecting to dashboard landing...</PageDescription>
      <PageDescription>If it does not automatically redirect </PageDescription>
      <Button>Click here</Button>
    </div>
  );
};

export default SigninPage;
