const LandingSection = ({ title, text }) => {
  return (
    <div className="flex h-auto w-full items-center justify-between">
      <div className="flex flex-col">
        <h3 className="title text-3xl font-semibold text-white">{title}</h3>
        <p className="text-2xl text-slate-100">{text}</p>
      </div>
      <div className="w-full ">Img Placeholder</div>
    </div>
  );
};

export default LandingSection;
