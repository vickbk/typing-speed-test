import { Icon } from "@/components/common/bi-icon";
import { CustomDetails } from "@/components/shared/CustomDetails";
import { SROnly } from "@/components/shared/SROnly";

export const MobileParams = <T extends string | number>({
  options,
  current,
  name,
  updateCurrent,
}: {
  current: T;
  name: string;
  options: [T, string][];
  updateCurrent: <T extends string | number>(payload: T) => void;
}) => {
  return (
    <CustomDetails className="relative md:hidden">
      <summary className="marker:content-[''] p-1 border rounded-md b-neutral-500 cursor-pointer text-center">
        <SROnly>Currently selected:</SROnly>
        {current} <Icon name="chevron-down" />
      </summary>
      <ul className="absolute z-10 w-full neutral-800 mt-2 rounded-lg">
        {options.map(([value, label]) => {
          return (
            <li
              key={value}
              className="not-last:border-b b-neutral-500 b-neutral-400"
            >
              <label className="flex gap-4 py-2 px-4 cursor-pointer">
                <input
                  type="radio"
                  name={name}
                  value={value}
                  checked={current === label}
                  className="sr-only"
                  onChange={() => updateCurrent(value)}
                />
                <Icon
                  name={
                    current === label
                      ? "record-circle-fill c-blue-400"
                      : "circle"
                  }
                />{" "}
                {label}
              </label>
            </li>
          );
        })}
      </ul>
    </CustomDetails>
  );
};
