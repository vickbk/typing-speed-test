import { Link, useSearchParams } from "react-router-dom";

function desktopScrolltoCurrent(node: HTMLElement | null) {
  node?.scrollIntoView({
    inline: "nearest",
    behavior: "smooth",
    block: "nearest",
  });
}

export const DesktopParams = <T extends string | number>({
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
    <ul className="hidden md:flex overflow-x-scroll overscroll-contain max-w-full gap-2">
      {options.map(([value, label]) => {
        query.set(name, value + "");
        return (
          <li
            key={value}
            className="shrink-0"
            ref={current === label ? desktopScrolltoCurrent : undefined}
          >
            <Link
              className={[
                "border rounded-md p-1 inline-block cursor-pointer",
                current === label ? "b-blue-400 c-blue-400" : "",
              ].join(" ")}
              to={`?${query}`}
              onClick={() => updateCurrent(value)}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
