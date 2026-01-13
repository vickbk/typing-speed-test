function desktopScrolltoCurrent(node: HTMLElement | null) {
  node?.scrollIntoView({
    inline: "nearest",
    behavior: "smooth",
    block: "start",
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
  return (
    <ul className="hidden md:flex overflow-x-scroll overscroll-contain gap-2">
      {options.map(([value, label]) => {
        return (
          <li
            key={value}
            className="shrink-0"
            ref={current === label ? desktopScrolltoCurrent : undefined}
          >
            <label
              className={[
                "border rounded-md p-1 inline-block cursor-pointer",
                current === label ? "b-blue-400 c-blue-400" : "",
              ].join(" ")}
            >
              <input
                type="radio"
                name={name}
                value={value}
                checked={current === label}
                className="sr-only"
                onChange={() => updateCurrent(value)}
              />{" "}
              {label}
            </label>
          </li>
        );
      })}
    </ul>
  );
};
