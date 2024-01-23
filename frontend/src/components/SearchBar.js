import { ReactComponent as SearchIcon } from "../assets/heroicons/search.svg";

const SearchBar = ({ searchValue, setSearchValue, placeholder, showIcon }) => {
  return (
    <div
      id="search-bar"
      className="relative flex w-full focus-within:text-gray-700"
    >
      <input
        className="w-full rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
        name="search"
        placeholder={placeholder}
        autoComplete="off"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
      {showIcon && (
        <SearchIcon className="absolute right-4 top-2 flex h-8 w-8 items-center justify-center text-slate-500"></SearchIcon>
      )}
    </div>
  );
};
export default SearchBar;
