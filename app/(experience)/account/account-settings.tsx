"use client";

import { TabButton } from "@/components/tab";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { PageTitle } from "@/components/ui/typography";
import { logoutUserServer } from "@/lib/cookie";

export default function AccountSettingsPage() {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-1 h-full">
      <div className="relative p-6 h-full flex flex-col justify-between">
        <div>
          <PageTitle>Account Settings</PageTitle>
          <div className="mt-6 flex flex-col items-start -mx-6">
            <TabButton selected>YOUR HERD</TabButton>
            <TabButton>PERSONAL DETAILS</TabButton>
            <TabButton>EMAIL PREFERENCES</TabButton>
            <TabButton>MANAGE ACCOUNT</TabButton>
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            size={"lg"}
            onClick={async () => {
              await logoutUserServer();
            }}
          >
            SIGN OUT
            <Icon type={"sign-out"} />
          </Button>
        </div>
        <div className="border-r absolute right-0 top-6 bottom-6"></div>
      </div>
      <div className="p-6 flex flex-col justify-between">
        <div>
          <PageTitle>YOUR HERD</PageTitle>
        </div>
        <div>
          <Button variant={"outline"} disabled>
            UPDATE DETAILS
          </Button>
        </div>
      </div>
    </div>
  );
}
