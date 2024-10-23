const StatCard = ({ data, incrementName, subtitle }) => {
  const isFinalCard = subtitle === "Overall" ? " last-of-type:basis-full" : "";
  return (
    <div
      className={
        `flex min-h-[10rem] w-full basis-[49%] flex-col justify-start rounded-xl border border-b-2 border-emerald-400 bg-green-200 p-2` +
        isFinalCard
      }
    >
      <h3 className="text-md font-semibold text-teal-600">{subtitle}:</h3>
      <ol className="flex h-full flex-col items-center justify-start">
        {data?.length > 0 ? (
          data.map((e, i) => (
            <li
              key={e[0]}
              className="first:rounded-lg first:p-2 first:text-xl first:font-bold"
            >
              {i + 1}. {e[0]} - {e[1]} {incrementName}
            </li>
          ))
        ) : (
          <div className="flex items-center justify-center text-lg font-semibold">
            Not enough titles to rank
          </div>
        )}
      </ol>
    </div>
  );
};
export default StatCard;
