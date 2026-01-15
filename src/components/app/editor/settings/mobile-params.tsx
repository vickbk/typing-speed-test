import { Icon } from "@/components/common/bi-icon";
import { CustomDetails } from "@/components/shared/CustomDetails";
import { SROnly } from "@/components/shared/SROnly";
import { Link, useSearchParams } from "react-router-dom";

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
  const [query] = useSearchParams();
  return (
    <CustomDetails className="relative md:hidden">
      <summary className="marker:content-[''] p-1 border rounded-md b-neutral-500 cursor-pointer text-center">
        <SROnly>Currently selected:</SROnly>
        {current} <Icon name="chevron-down" />
      </summary>
      <ul className="absolute z-10 w-full neutral-800 mt-2 rounded-lg">
        {options.map(([value, label]) => {
          query.set(name, value + "");
          return (
            <li
              key={value}
              className="not-last:border-b b-neutral-500 b-neutral-400"
            >
              <Link
                className="flex gap-4 py-2 px-4 cursor-pointer"
                to={`?${query}`}
                onClick={() => updateCurrent(value)}
              >
                <Icon
                  name={
                    current === label
                      ? "record-circle-fill c-blue-400"
                      : "circle"
                  }
                />{" "}
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </CustomDetails>
  );
};
