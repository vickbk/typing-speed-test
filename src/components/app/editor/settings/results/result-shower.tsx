export const ResultsShower = ({
  index,
  value,
  valueColor = "",
}: {
  index: React.ReactNode;
  value: string;
  valueColor?: string;
}) => {
  return (
    <div className="grow not-first:border-l b-neutral-500 sm:flex sm:gap-2 lg:not-first:pl-4 lg:not-last:pr-4 items-center justify-center">
      <dt className="c-neutral-400 sm:text-[1.13rem]">{index}:</dt>
      <dd className={"font-bold text-3xl sm:text-xl " + valueColor}>{value}</dd>
    </div>
  );
};
