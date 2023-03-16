import { useState, useEffect } from "react";
import Entry from "./Entry";
import Sidebar from "./Sidebar"
import EntryForm from "./EntryForm";
import entryService from "../services/entries";
import journalService from "../services/journals";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

// add login here later

const Home = () => {
  const [entries, setEntries] = useState([]);
  const [journals, setJournals] = useState([]);
  const [currJournal, setCurrJournal] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showJournals, setShowJournals] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  
  useEffect(() => {
    
    journalService.getAll()
        .then((journals) => 
        {
            setJournals(journals)
            console.log(journals)
            const allEntries = journals.map((j) => j.entries).flat();
            console.log(allEntries)
            setEntries(allEntries)
            setIsLoading(false)
            
        });
    
  }, []);

  useEffect(() => {
    setEntries(currJournal.entries)
  }, [currJournal])


  return (
    <div className="relative bg-gradient-to-b from-teal-900 to-cyan-00 gradient w-screen h-screen">
      
      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} journals={journals} setCurrJournal={setCurrJournal} />}
      { isLoading && 
            <div className="absolute top-[50%] left-[50%] z-50 text-center text-2xl bg-teal-400 text-white rounded-sm ">Loading...</div>}


      <div className="grid grid-cols-6 p-6 text-teal-100">
        <button onClick={() => setShowSidebar(!showSidebar)}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 "
            >
            
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
            </svg>
        </button>
        <h1 className=" col-span-3 text-2xl font-semibold underline underline-offset-1 decoration-teal-500 truncate justify-self-start">
          {currJournal.journalName ? currJournal.journalName : 'All journals'}
        </h1>
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 justify-self-end">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
        </svg>
        <Link to='/create' state={{journalName: currJournal.journalName}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 justify-self-end text-teal-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </Link> 
      </div>

      <div
        id="search-bar"
        className="flex w-full items-center mx-auto text-gray-500 focus-within:text-gray-700 "
      >
        <svg
          className="absolute ml-12 w-5 h-5 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          className="px-12 rounded-lg mx-auto border-gray-400 bg-gray-300 shadow-black h-10 w-[85%] focus-within:border-emerald-500"
          name="search"
          placeholder="Search entries"
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.value)}
        >

          
        </input>
      </div>

      
      
      <div className="w-full h-full overflow-y-auto relative z-10 pb-28 mt-4 ">
          <div className='h-auto w-screen pb-20'>
          
          
          { entries ? 
            entries.map((e) => (
                <div className=" w-full h-auto p-4" key={e.id}>
                    <Entry entry={e}></Entry>
                </div>) 
          ) : <div className="text-2xl bg-red-500 z-50"> Add a new entry!</div>
            
          
          }
          </div>
        </div>
        <div className="bg-gradient-to-br from-teal-700 to-teal-900 h-screen w-screen absolute top-56 rounded-3xl shadow-2xl -z-5 pointer-events-none">

        </div>
      
        
      
      </div>
      
      
    
  );
};

export default Home;
