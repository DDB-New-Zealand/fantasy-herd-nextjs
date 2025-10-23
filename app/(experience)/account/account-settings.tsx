"use client";

import { TabButton } from "@/components/tab";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { PageTitle } from "@/components/ui/typography";
import { logoutUserServer } from "@/lib/cookie";
import { useState } from "react";
import HerdSettings from "./herd-settings";
import PersonalDetails from "./personal-details";

export type Tab =
  | "herd"
  | "personal-details"
  | "email-preferences"
  | "manage-account";

export default function AccountSettingsPage() {
  const [tab, setTab] = useState<Tab>("herd");

  console.log(tab);

  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-1 h-full">
      <div className="relative p-6 h-full flex flex-col justify-between">
        <div>
          <PageTitle>Account Settings</PageTitle>
          <div className="mt-6 flex flex-col items-start -mx-6">
            <TabButton
              selected={tab === "herd"}
              onClick={() => {
                setTab("herd");
              }}
            >
              YOUR HERD
            </TabButton>
            <TabButton
              selected={tab === "personal-details"}
              onClick={() => {
                setTab("personal-details");
              }}
            >
              PERSONAL DETAILS
            </TabButton>
            <TabButton
              selected={tab === "email-preferences"}
              onClick={() => {
                setTab("email-preferences");
              }}
            >
              EMAIL PREFERENCES
            </TabButton>
            <TabButton
              selected={tab === "manage-account"}
              onClick={() => {
                setTab("manage-account");
              }}
            >
              MANAGE ACCOUNT
            </TabButton>
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
      <div className="p-6">
        {tab === "herd" && <HerdSettings />}
        {tab === "personal-details" && <PersonalDetails />}
      </div>
    </div>
  );
}
