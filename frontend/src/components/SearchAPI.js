import { useState, useContext, useRef, useEffect } from "react";
import { useDebounce } from "react-use";
import { Transition } from "@headlessui/react";

import gamesService from "../services/games";

const SearchAPI = ({
  searchValue,
  setSearchValue,
  mediaObj,
  setMediaObj,
  placeholder,
}) => {
  const [games, setGames] = useState([]);
  const [showGames, setShowGames] = useState(false);
  const [, cancel] = useDebounce(
    async () => {
      console.log(searchValue);
      if (searchValue) {
        const currGames = await gamesService.getTitle(searchValue);
        setGames(currGames["games"]);
        console.log(currGames["games"]);
      } else {
        setGames([]);
      }
    },
    1500,
    [searchValue]
  );

  const onSearch = async (e) => {
    setSearchValue(e.target.value);
    //console.log(currGames['games'])
  };

  const onClickGame = (e, g) => {
    setMediaObj(g);
    setSearchValue(g.title);
  };

  return (
    <div className="flex w-full flex-col focus-within:text-gray-700 ">
      <div className="relative h-auto">
        <input
          className="mt-1 mb-2 w-full rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition  duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
          name="search"
          data-cy='input-entry-media'
          placeholder={placeholder}
          autoComplete="off"
          value={searchValue}
          onChange={(e) => onSearch(e)}
          onFocus={(e) => setShowGames(true)}
          onBlur={(e) => setShowGames(false)}
        ></input>
        {showGames ? (
          <div 
          data-cy='media-dropdown'
          className="absolute top-11 left-0 z-50 h-auto w-full divide-y-2 rounded-md rounded-t-none border-b-4 border-teal-700 bg-teal-50 py-1 font-medium text-slate-500 shadow-2xl transition duration-300 ease-linear hover:cursor-pointer">
            {games !== [] ? (
              games.map((g) => (
                <div
                  key={g.game_id}
                  onMouseDown={(e) => onClickGame(e, g)}
                  className="w-full bg-transparent px-2 py-1 font-normal hover:bg-slate-200"
                >
                  {g.title}
                </div>
              ))
            ) : (
              <div className="w-full bg-transparent px-2 py-1 font-normal hover:bg-slate-200">
                Find your game
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default SearchAPI;
