"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";

export function ErrorElement({
  error,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex grow flex-col items-center justify-center">
      <title>Error | Rock Paper Scissors</title>
      <h2 className="text-center">
        {error?.message || "Something went wrong!"}
      </h2>
      <Link
        className="mt-4 rounded-md px-4 py-2 text-sm transition-colors outstand shadow"
        to={"/"}
      >
        Go back Home
      </Link>
    </section>
  );
}
