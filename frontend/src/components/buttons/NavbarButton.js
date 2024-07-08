const NavbarButton = ({ text, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="h-16 w-24 rounded-md bg-opacity-50 text-xl transition-all ease-in-out hover:bg-slate-200 hover:bg-opacity-20 hover:text-emerald-300"
    >
      {text}
    </button>
  );
};

export default NavbarButton;
