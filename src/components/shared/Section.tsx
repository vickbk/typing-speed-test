import { HeadingCtx } from "@/contexts/HeadingCtx";
import { forwardRef, useContext, type HTMLAttributes } from "react";

export const Section = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => {
    const level = useContext(HeadingCtx);
    return (
      <section {...props} ref={ref}>
        <HeadingCtx value={level + 1}>{children}</HeadingCtx>
      </section>
    );
  }
);
