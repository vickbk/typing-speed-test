"use client";

import {
  Heading,
  Section,
} from "@/shared/heading-manager/components/heading-managers";
import CustomDialog from "@/shared/helpers/components/CustomDialog";
import { Link } from "react-router-dom";
import { useError } from "../hooks";
import type { ErrorProps } from "../types";

export function ErrorElement({ error }: ErrorProps) {
  const { navigate } = useError({ error });

  return (
    <CustomDialog
      onClose={() => navigate("/home")}
      isOpen
      className="m-auto p-4 background c-foreground rounded-md"
    >
      <Section className="flex grow flex-col items-center justify-center">
        <title>Error | Typing speed test</title>
        <Heading className="text-center">
          {error?.message || "Something went wrong!"}
        </Heading>
        <Link
          className="mt-4 rounded-md px-4 py-2 text-sm active-button outstand shadow"
          to={"/home"}
        >
          Go back Home
        </Link>
      </Section>
    </CustomDialog>
  );
}
