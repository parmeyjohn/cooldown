

const SearchBar = ({searchValue, setSearchValue, placeholder}) => { 

return (
    
    
    
    <div
        id="search-bar"
        className="flex p-4 w-full items-center justify-between mx-auto  focus-within:text-gray-700 "
      >
        
        <input
          className="bg-teal-50 py-2 px-2 mb-2 w-[80%] border-2 border-teal-800 rounded-lg focus:bg-teal-100 shadow-inner shadow-slate-300"
          name="search"
          placeholder={placeholder}
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.value)}
        >
          
        </input>
        
        
      </div>

)
}
export default SearchBar

