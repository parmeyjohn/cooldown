import { useState, useContext, useRef, useEffect } from "react";
import { useDebounce } from "react-use";
import { Transition } from "@headlessui/react";

import gamesService from "../services/games";

import { ReactComponent as SearchIcon } from "../assets/heroicons/search.svg";
import { ReactComponent as BookIcon } from "../assets/heroicons/book.svg";
import { ReactComponent as MovieIcon } from "../assets/heroicons/movie.svg";
import { ReactComponent as MusicIcon } from "../assets/heroicons/music.svg";

import { GrGamepad as ControllerIcon } from "react-icons/gr";
import GenreButton from "./GenreButton";

const SearchAPI = ({
  searchValue,
  setSearchValue,
  mediaObj,
  setMediaObj,
  placeholder,
}) => {
  const [games, setGames] = useState([]);

  const [genre, setGenre] = useState("Game");

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
      <div className="flex h-16 w-full justify-around pb-2">
        <GenreButton
          name={"Game"}
          icon={<ControllerIcon className="h-6 w-6"></ControllerIcon>}
          genre={genre}
          setGenre={setGenre}
        ></GenreButton>
        <GenreButton
          name={"Film"}
          icon={<MovieIcon className="h-6 w-6"></MovieIcon>}
          genre={genre}
          setGenre={setGenre}
        ></GenreButton>
        <GenreButton
          name={"Book"}
          icon={<BookIcon strokeWidth={1.5} className="h-6 w-6"></BookIcon>}
          genre={genre}
          setGenre={setGenre}
        ></GenreButton>
        <GenreButton
          name={"Audio"}
          icon={<MusicIcon className="h-6 w-6"></MusicIcon>}
          genre={genre}
          setGenre={setGenre}
        ></GenreButton>
        <GenreButton
          name={"Other"}
          icon={<ControllerIcon className="h-6 w-6"></ControllerIcon>}
          genre={genre}
          setGenre={setGenre}
        ></GenreButton>
      </div>
      <div className="relative h-auto">
        <input
          className="mt-1 mb-2 w-full rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
          name="search"
          data-cy="input-entry-media"
          placeholder={placeholder}
          autoComplete="off"
          value={searchValue}
          onChange={(e) => onSearch(e)}
          onFocus={(e) => setShowGames(true)}
          onBlur={(e) => setShowGames(false)}
        ></input>
        {showGames ? (
          <div
            data-cy="media-dropdown"
            className="absolute top-11 left-0 z-50 h-auto w-full divide-y-2 rounded-md rounded-t-none border-b-4 border-teal-700 bg-teal-50 py-1 font-medium text-slate-500 shadow-2xl transition duration-300 ease-linear"
          >
            {games.map((g) => (
              <div
                key={g.game_id}
                onMouseDown={(e) => onClickGame(e, g)}
                className="w-full bg-transparent px-2 py-1 font-normal hover:cursor-pointer hover:bg-slate-200"
              >
                {g.title}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
        <SearchIcon
          strokeWidth={1.5}
          className="absolute right-3 top-4 h-6 w-6 text-teal-800"
        ></SearchIcon>
      </div>
    </div>
  );
};
export default SearchAPI;
