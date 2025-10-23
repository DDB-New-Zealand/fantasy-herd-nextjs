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
import { AnnotationLabel, PageTitle } from "@/components/ui/typography";
import useUserStore from "@/stores/user-store";
import { useActionState, useId, useState } from "react";

type FormError = {
  herd_name: string | undefined;
};

type FormInputData = {
  herd_name: string;
};

export default function HerdSettings() {
  const { herdName, updateHerdName } = useUserStore();
  const id = useId();

  const [data, setData] = useState<FormInputData>({
    herd_name: "",
  });
  const [error, formAction, isPending] = useActionState<
    FormError | null,
    FormData
  >(async (prev, formdata) => {
    const herd_name = formdata.get(`herd_name`);

    const error: FormError = {
      herd_name: undefined,
    };

    if (!herd_name) {
      error["herd_name"] = "Herd name is required";
    }

    if (Object.values(error).filter(Boolean).length > 0) {
      return error;
    }

    updateHerdName(data.herd_name);

    return null;
  }, null);

  return (
    <form className="flex flex-col justify-between h-full" action={formAction}>
      <div>
        <PageTitle>YOUR HERD</PageTitle>
        <FieldGroup className="mt-6">
          <FieldSet>
            <Field className="max-w-[491px]">
              <FieldLabel htmlFor={`${id}_herd_name`}>
                Change your herd name
              </FieldLabel>
              <Input
                id={`${id}_herd_name`}
                placeholder={herdName}
                value={data.herd_name}
                onChange={(e) => {
                  setData({
                    herd_name: e.target.value,
                  });
                }}
              />
              <FieldError>{error?.herd_name}</FieldError>
              <AnnotationLabel>
                *Fantasy Herd is a family sport, no foul language.
              </AnnotationLabel>
            </Field>
          </FieldSet>
        </FieldGroup>
      </div>
      <div>
        <Button
          type="submit"
          variant={"outline"}
          disabled={isPending || !data.herd_name}
        >
          UPDATE DETAILS
        </Button>
      </div>
    </form>
  );
}
