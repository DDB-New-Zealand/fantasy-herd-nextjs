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
  password: string | undefined;
};

type FormInputData = {
  email: string;
  password: string;
  show_password?: boolean;
};

export default function SignInPage() {
  const id = useId();

  const [data, setData] = useState<FormInputData>({
    email: "",
    password: "",
  });
  const [error, formAction, isPending] = useActionState<
    FormError | null,
    FormData
  >(async (prev, formdata) => {
    const email = formdata.get(`email`);
    const password = formdata.get("password");

    const error: FormError = {
      email: undefined,
      password: undefined,
    };

    if (!email) {
      error["email"] = "Email is required";
    }

    if (!password) {
      error["password"] = "Password is required";
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
          <PageTitleBig>SIGN IN</PageTitleBig>
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
                  <Field>
                    <FieldLabel htmlFor={`${id}_password`}>Password</FieldLabel>
                    <Input
                      id={`${id}_password`}
                      name="password"
                      type={data.show_password ? "text" : "password"}
                      aria-invalid={error?.password ? "true" : "false"}
                      value={data.password}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                      }}
                    />
                    <FieldError>{error?.password}</FieldError>
                    <div className="flex gap-3 mt-3">
                      <Checkbox
                        id={`${id}_show_password`}
                        name="show_password"
                        aria-invalid={error?.password ? "true" : "false"}
                        checked={data.show_password}
                        onCheckedChange={(value) => {
                          setData((prev) => ({
                            ...prev,
                            show_password: value === true,
                          }));
                        }}
                      />
                      <FieldLabel htmlFor={`${id}_show_password`}>
                        Show password
                      </FieldLabel>
                    </div>
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
                  Sign in
                </Button>
              </Field>
            </FieldGroup>
          </form>

          <SignUpFooterLabel className="flex items-center justify-center mt-6 gap-3">
            <span>DON'T HAVE AN ACCOUNT?</span>
            <Button asChild variant={"underline"} size={"link"}>
              <Link href={"/forgot-password"}>RESET</Link>
            </Button>
          </SignUpFooterLabel>

          <div className="flex items-center justify-center gap-3 mt-6">
            <hr className="grow" />
            <div>OR</div>
            <hr className="grow" />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              variant={"outline"}
              onClick={async () => {
                await loginUserServer("GOOGLE User");
              }}
            >
              LOG IN WITH GOOGLE <Icon type="google" />
            </Button>
            <Button
              variant={"outline"}
              onClick={async () => {
                await loginUserServer("FACEBOOK User");
              }}
            >
              LOG IN WITH FACEBOOK <Icon type="facebook" />
            </Button>
            <Button
              variant={"outline"}
              onClick={async () => {
                await loginUserServer("APPLE User");
              }}
            >
              LOG IN WITH APPLE <Icon type="apple" />
            </Button>
            <Button
              variant={"outline"}
              onClick={async () => {
                await loginUserServer("X User");
              }}
            >
              LOG IN WITH X <Icon type="X" />
            </Button>
          </div>
        </div>
        <div>
          <HomeFooter className="flex items-center justify-center gap-3">
            <span>DON'T HAVE AN ACCOUNT?</span>
            <Button asChild variant={"underline"} size={"link"}>
              <Link href={"/sign-up"}>REGISTER NOW</Link>
            </Button>
          </HomeFooter>
        </div>
      </div>
      <div className="bg-primary/50 p-5"></div>
    </div>
  );
}
