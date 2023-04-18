import { useState, useContext, useRef, useEffect } from "react";
import {useDebounce} from "react-use"
import gamesService from "../services/games";


const SearchAPI = ({ searchValue, setSearchValue, placeholder }) => {
    const [games, setGames] = useState([])
    const [showGames, setShowGames] = useState(false)
    const [currTitle, setCurrTitle] = useState({})
    const [, cancel] = useDebounce( async () => {
        console.log(searchValue)
        if (searchValue) {
            const currGames =  await gamesService.getTitle(searchValue)
            setGames(currGames['games'])
            console.log(currGames['games'])
        } else {
            setGames([])
        }
    }, 1500,
    [searchValue])

    const onSearch = async (e) => {
        setSearchValue(e.target.value) 
        console.log(currTitle)
        //console.log(currGames['games'])
    }

    const onClickGame = (e, g) => {
        setCurrTitle(g)
        setSearchValue(g.title)
    }
    
    return (
      <div
        className="w-full relative flex flex-col focus-within:text-gray-700 "
      >
        <label className="text-md font-semibold px-2">Media:</label>
        <input
          className="transition ease-in-out duration-300 bg-slate-300 p-3 mb-2 w-full shadow-inner shadow-slate-400  outline-8 focus:outline-offset-1 focus:outline-teal-700 focus:bg-teal-50 focus:shadow-none rounded-lg"
          name="search"
          placeholder={placeholder}
          autoComplete="off"
          value={searchValue}
          onChange={(e) => onSearch(e)}
          onFocus={(e) => setShowGames(true)}
          onBlur={(e) => setShowGames(false)}
        ></input>
        {showGames && 
            <div className="bg-teal-50 border-b-4 border-teal-700 text-slate-500 font-medium divide-y-2 shadow-2xl rounded-md rounded-t-none py-1 hover:cursor-pointer h-auto w-full absolute top-24 left-0 z-50">
                {games !== [] ? 
                    games.map((g) => (
                    <div 
                        key={g.id} 
                        onMouseDown={(e) => onClickGame(e, g)}
                        className="bg-transparent font-normal px-2 py-1 w-full hover:bg-slate-200">{g.title}</div>
                    ))
                :
                <div className="bg-transparent font-normal px-2 py-1 w-full hover:bg-slate-200">
                        Find your game
                </div>}
            </div>
        }
        
      </div>
    );
  };
  export default SearchAPI;
  