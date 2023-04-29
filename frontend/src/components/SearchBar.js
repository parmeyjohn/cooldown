const SearchBar = ({ searchValue, setSearchValue, placeholder }) => {
  return (
    <div id="search-bar" className="flex w-full focus-within:text-gray-700 ">
      <input
        className="mb-2 w-full rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition  duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
        name="search"
        placeholder={placeholder}
        autoComplete="off"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
    </div>
  );
};
export default SearchBar;
