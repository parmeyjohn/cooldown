const SearchBar = ({ searchValue, setSearchValue, placeholder }) => {
  return (
    <div
      id="search-bar"
      className="flex w-full items-center justify-between focus-within:text-gray-700 "
    >
      <input
        className="bg-slate-300 p-2 mb-2 w-full shadow-inner shadow-slate-400  outline-8 focus:outline-offset-1 focus:outline-teal-700 focus:bg-teal-50 focus:shadow-none rounded-lg"
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
