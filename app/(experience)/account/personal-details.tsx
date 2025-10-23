"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Placeholder from "@/components/ui/placeholder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageTitle } from "@/components/ui/typography";
import { useActionState, useId, useState } from "react";

type FormError = {
  first_name: string | undefined;
  last_name: string | undefined;
  date_of_birth: string | undefined;
  country: string | undefined;
  phone_number: string | undefined;
};

type FormInputData = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  country: string;
  phone_number: string;
};

export default function HerdSettings() {
  const id = useId();

  const [data, setData] = useState<FormInputData>({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    country: "",
    phone_number: "",
  });
  const [error, formAction, isPending] = useActionState<
    FormError | null,
    FormData
  >(async (prev, formdata) => {
    const first_name = formdata.get(`first_name`);
    const last_name = formdata.get(`last_name`);
    const date_of_birth = formdata.get(`date_of_birth`);
    const country = formdata.get(`country`);
    const phone_number = formdata.get(`phone_number`);

    const error: FormError = {
      first_name: undefined,
      last_name: undefined,
      date_of_birth: undefined,
      country: undefined,
      phone_number: undefined,
    };

    if (!first_name) {
      error["first_name"] = "First name is required";
    }
    if (!last_name) {
      error["last_name"] = "Last name is required";
    }
    if (!date_of_birth) {
      error["date_of_birth"] = "Date of birth is required";
    }
    if (!country) {
      error["country"] = "Please pick a country";
    }

    if (Object.values(error).filter(Boolean).length > 0) {
      return error;
    }

    // updateHerdName(data.herd_name);

    return null;
  }, null);

  return (
    <form className="flex flex-col justify-between h-full" action={formAction}>
      <div>
        <PageTitle>Personal Details</PageTitle>
        <FieldGroup className="mt-6">
          <FieldSet className="grid grid-cols-2">
            <Field>
              <FieldLabel htmlFor={`${id}_first_name`}>First name</FieldLabel>
              <Input
                id={`${id}_first_name`}
                value={data.first_name}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }));
                }}
              />
              <FieldError>{error?.first_name}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor={`${id}_last_name`}>Last name</FieldLabel>
              <Input
                id={`${id}_last_name`}
                value={data.last_name}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }));
                }}
              />
              <FieldError>{error?.last_name}</FieldError>
            </Field>
          </FieldSet>
          <FieldSet className="grid grid-cols-2">
            <Field>
              <FieldLabel htmlFor={`${id}_date_of_birth`}>
                Date of Birth
              </FieldLabel>
              <Input
                type="date"
                id={`${id}_date_of_birth`}
                value={data.date_of_birth}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    date_of_birth: e.target.value,
                  }));
                }}
              />
              <FieldError>{error?.date_of_birth}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor={`${id}_country`}>
                Country of residence
              </FieldLabel>
              <Select
                value={data.country}
                onValueChange={(value) => {
                  setData((prev) => ({
                    ...prev,
                    country: value,
                  }));
                }}
              >
                <SelectTrigger id={`${id}_country`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nz">
                    {/* Flag */}
                    <Placeholder className="w-[28px] h-[22px]"></Placeholder>
                    New Zealand
                  </SelectItem>
                </SelectContent>
              </Select>
              <FieldError>{error?.country}</FieldError>
            </Field>
          </FieldSet>
          <FieldSet className="grid grid-cols-2">
            <Field>
              <FieldLabel
                htmlFor={`${id}_country`}
              >{`Phone number (optional)`}</FieldLabel>
              <Input
                type="tel"
                id={`${id}_phone_number`}
                value={data.phone_number}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    phone_number: e.target.value,
                  }));
                }}
              />
              <FieldError>{error?.phone_number}</FieldError>
            </Field>
          </FieldSet>
        </FieldGroup>
      </div>
      <div>
        <Button type="submit" variant={"secondary"} disabled={isPending}>
          UPDATE DETAILS
        </Button>
      </div>
    </form>
  );
}
