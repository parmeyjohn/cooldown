import { useState, useEffect } from "react";
import Entry from "./Entry";
import Sidebar from "./Sidebar"
import EntryForm from "./EntryForm";
import SearchBar from "./SearchBar"

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
            // initializing journal to be root journal which contains every entry
            setCurrJournal(journals[0])
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
    <div className="relative bg-slate-800 shadow-inner w-screen h-screen">
      
      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} journals={journals} setJournals={setJournals} currJournal={currJournal} setCurrJournal={setCurrJournal} />}
      { isLoading && 
            <div className="absolute top-[50%] left-[50%] z-50 text-center text-2xl bg-teal-400 text-white rounded-sm ">Loading...</div>}


      <div className="flex justify-between items-center p-6 text-teal-100">
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
          {currJournal.journalName}
        </h1>
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 justify-self-end">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
        </svg>
        
        <Link to='/create' state={{journal: currJournal}}>
            <button className="p-3 mb-2 rounded-lg bg-teal-600 border-solid shadow-xl hover:bg-teal-700 border-teal-900 active:shadow-md active:bg-teal-900 border-b-2 text-teal-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 justify-self-end">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
        </Link> 
      </div>

      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} placeholder={'Search entries...'}></SearchBar>
      
      
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
