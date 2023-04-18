const SearchBar = ({ searchValue, setSearchValue, placeholder }) => {
  return (
    <div
      id="search-bar"
      className="w-full flex focus-within:text-gray-700 "
    >
      <input
        className="transition ease-in-out duration-300 bg-slate-300 p-3 mb-2 w-full shadow-inner shadow-slate-400  outline-8 focus:outline-offset-1 focus:outline-teal-700 focus:bg-teal-50 focus:shadow-none rounded-lg"
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
