"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  HomeFooter,
  PageTitleBig,
  SignUpFooterLabel,
} from "@/components/ui/typography";
import { loginUserServer } from "@/lib/cookie";
import Link from "next/link";
import { useActionState, useId, useState } from "react";

type FormError = {
  email: string | undefined;
};

type FormInputData = {
  email: string;
};

export default function ForgotPasswordPage() {
  const id = useId();

  const [data, setData] = useState<FormInputData>({
    email: "",
  });
  const [error, formAction, isPending] = useActionState<
    FormError | null,
    FormData
  >(async (prev, formdata) => {
    const email = formdata.get(`email`);

    const error: FormError = {
      email: undefined,
    };

    if (!email) {
      error["email"] = "Email is required";
    }

    if (Object.values(error).filter(Boolean).length > 0) {
      return error;
    }

    await loginUserServer(email as string);

    return null;
  }, null);

  return (
    <div className="w-full h-full grid grid-cols-2">
      <div className="flex flex-col p-5 justify-between items-center">
        <div>
          <PageTitleBig>Forgot password</PageTitleBig>
        </div>
        <div className="w-full">
          <form action={formAction}>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor={`${id}_email`}>
                      Email Address
                    </FieldLabel>
                    <Input
                      id={`${id}_email`}
                      name="email"
                      aria-invalid={error?.email ? "true" : "false"}
                      value={data.email}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                    />
                    <FieldError>{error?.email}</FieldError>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <Field orientation="horizontal">
                <Button
                  type="submit"
                  variant="secondary"
                  size={"lg"}
                  disabled={isPending}
                >
                  Submit
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
        <div>
          <HomeFooter className="flex items-center justify-center gap-3">
            <span>Don't have an account?</span>
            <Button asChild variant={"underline"} size={"link"}>
              <Link href={"/sign-up"}>Register Now</Link>
            </Button>
          </HomeFooter>
        </div>
      </div>
      <div className="bg-primary/50 p-5"></div>
    </div>
  );
}
