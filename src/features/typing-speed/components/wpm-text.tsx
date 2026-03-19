import { SROnly } from "@/shared/helpers/components/SROnly";

export function WPMText() {
  return (
    <>
      <abbr className="no-underline" title="Word Per Minute">
        WPM
      </abbr>
      <SROnly> (Word Per Minute)</SROnly>
    </>
  );
}
