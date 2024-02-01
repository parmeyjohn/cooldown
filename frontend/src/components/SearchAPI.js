import { useState, useContext, useRef, useEffect } from "react";
import { useDebounce } from "react-use";
import { Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";

import gameService from "../services/games";
import filmService from "../services/films";
import bookService from "../services/books";
import audioService from "../services/audio";

import { ReactComponent as SearchIcon } from "../assets/heroicons/search.svg";
import { ReactComponent as BookIcon } from "../assets/heroicons/book.svg";
import { ReactComponent as MovieIcon } from "../assets/heroicons/movie.svg";
import { ReactComponent as MusicIcon } from "../assets/heroicons/music.svg";
import { GrGamepad as ControllerIcon } from "react-icons/gr";

import MediaTypeButton from "./MediaTypeButton";

const SearchAPI = ({ setMediaObj, placeholder }) => {
  const [mediaType, setMediaType] = useState("Game");
  const [showGames, setShowGames] = useState(false);

  const services = {
    Game: gameService,
    Film: filmService,
    Book: bookService,
    Audio: audioService,
    Other: undefined,
  };

  const icons = {
    Game: <ControllerIcon className="h-6 w-6"></ControllerIcon>,
    Film: <MovieIcon className="h-6 w-6"></MovieIcon>,
    Book: <BookIcon strokeWidth={1.5} className="h-6 w-6"></BookIcon>,
    Audio: <MusicIcon className="h-6 w-6"></MusicIcon>,
    Other: <ControllerIcon className="h-6 w-6"></ControllerIcon>,
  };

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const [, err] = useDebounce(
    () => setDebouncedSearchValue(searchValue),
    1000,
    [searchValue]
  );

  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const titles = await services[mediaType].searchTitle(
        debouncedSearchValue
      );
      console.log("search is goin", titles);
      return titles;
    },
    queryKey: ["titles", debouncedSearchValue],
    placeholderData: [],
    enabled: debouncedSearchValue.length > 0,
  });

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickMedia = (e, m) => {
    services[mediaType]
      .getTitleById(m.id)
      .then((newMediaObj) => setMediaObj((prev) => newMediaObj));
    setSearchValue(m.title);
  };

  return (
    <div className="flex w-full flex-col focus-within:text-gray-700 ">
      <div className="flex h-16 w-full justify-around pb-2">
        {Object.keys(services).map((k) => {
          return (
            <MediaTypeButton
              name={k}
              key={k}
              icon={icons[k]}
              mediaType={mediaType}
              setMediaType={setMediaType}
            ></MediaTypeButton>
          );
        })}
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
            {data &&
              data.map((m) => (
                <div
                  key={m.id}
                  onMouseDown={(e) => onClickMedia(e, m)}
                  className="w-full bg-transparent px-2 py-1 font-normal hover:cursor-pointer hover:bg-slate-200"
                >
                  {`${m.title} ${m.year ? `(${m.year})` : ""}`}
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
