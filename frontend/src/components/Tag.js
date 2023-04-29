const Tag = ({ title, removeTag, handleClick }) => {
  return (
    <div
      onClick={handleClick ? () => handleClick(title) : () => {}}
      className="focus mx-1 h-fit w-fit whitespace-nowrap rounded-2xl border-b-2 border-solid border-emerald-500 bg-green-300 px-3 py-1 font-semibold uppercase tracking-wider text-teal-900 hover:bg-emerald-400 active:bg-emerald-500 active:shadow-md"
    >
      <div className="mx-auto inline">{title}</div>
      {removeTag && (
        <div className="inline" onClick={() => removeTag(title)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="ml-2 inline h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Tag;
