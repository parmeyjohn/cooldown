const MediaTypeButton = ({ name, icon, mediaType, setMediaType }) => {
  return (
    <button
      onClick={() => setMediaType((prev) => name)}
      className={`${
        mediaType === name
          ? "cursor-default border-b-4 border-l-0 border-b-teal-600 bg-green-300 font-semibold hover:bg-green-300"
          : "bg-slate-200"
      } flex w-full items-center justify-center gap-2 border-r border-b-2 border-b-slate-400 border-r-slate-400  first:rounded-l-md last:rounded-r-md last:border-r-0 hover:bg-emerald-200 active:bg-emerald-300`}
    >
      <span className="hidden sm:block">{icon}</span>
      {name}
    </button>
  );
};

export default MediaTypeButton;
