"use client";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Section } from "../shared/Section";
import { Heading } from "../shared/Heading";
import CustomDialog from "../shared/CustomDialog";

export function ErrorElement({
  error,
}: {
  error?: Error & { digest?: string };
}) {
  const navigate = useNavigate();
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

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
