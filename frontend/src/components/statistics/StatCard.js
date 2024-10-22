const StatCard = ({ data, incrementName, subtitle }) => {
  const isFinalCard = subtitle === "Overall" ? " last-of-type:basis-full" : "";
  return (
    <div
      className={
        `flex h-40 w-full basis-[49%] flex-col justify-start rounded-xl border border-b-2 border-emerald-400 bg-green-200 p-2` +
        isFinalCard
      }
    >
      <h3 className="text-md font-semibold text-teal-600">{subtitle}:</h3>
      <ol className="flex flex-col items-center">
        {data.map((e) => (
          <li
            key={e[0]}
            className="first:rounded-lg first:p-2 first:text-xl first:font-bold"
          >
            {e[0]} - {e[1]} {incrementName}
          </li>
        ))}
      </ol>
    </div>
  );
};
export default StatCard;
