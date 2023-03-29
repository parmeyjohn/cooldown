import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import journalService from "../services/journals";
import SearchBar from "./SearchBar";
import OptionsButton from "./OptionsButton"
import SidebarJournal from "./SidebarJournal"

const Sidebar = ({ showSidebar, setShowSidebar, journals, setJournals, currJournal, setCurrJournal }) => {
  const [newJournalName, setNewJournalName] = useState("");

  const addJournal = async (event) => {
    event.preventDefault();
    if (newJournalName.length > 1) {
      const journalObject = {
        journalName: newJournalName,
        //user: current user
        entries: [],
      };
      const newJournal = await journalService.create(journalObject);
      //add colors down the road
      setJournals(journals.concat(newJournal))
      setNewJournalName("");
      console.log(newJournal);
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      addJournal(event);
    }
  };
  //onClick={()=>setShowSidebar(false)}
  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-40 z-20">
      <nav
        id="sidebar"
        className="z-30 absolute top-0 left-0 flex flex-col h-screen w-[80%] bg-slate-200 shadow-md"
      >
        <div className="w-full flex justify-between">
          <h1 className="text-2xl font-semibold p-8">Cooldown</h1>
          <button onClick={() => setShowSidebar(false)} className=''>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 mr-10 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>
                
        
        <div className="flex justify-start items-center pt-2 pl-4 text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <h2 className="text-md font-medium h-6 ml-2  ">Search:</h2>
        </div>
        <div className="pl-4 m-2">
          <SearchBar placeholder={'Search journals...'}></SearchBar>
        </div>

        <div className="flex justify-start items-center pt-2 pl-4 text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <h2 className="text-md font-medium h-6 ml-2  ">Journals:</h2>

        </div>
        <div className=" mx-4 p-2 h-80 rounded-xl ">
          
          <div className=" overflow-y-auto h-64" >
            {journals.map((j) => (
              <SidebarJournal key={j.id} journal={j} journals={journals} currJournal={currJournal} setCurrJournal={setCurrJournal} setJournals={setJournals}></SidebarJournal>
              
            ))}
          </div>

          <div className="flex justify-between pl-4 py-4">
            <input
              className="bg-teal-50 py-2 px-2 mb-2 w-[80%] border-2 border-teal-800 rounded-lg focus:bg-teal-100 shadow-inner shadow-slate-300"
              type="text"
              name="new-journal"
              placeholder="Add a journal..."
              value={newJournalName}
              onChange={(e) => setNewJournalName(e.target.value)}
              onKeyDown={handleEnter}
            ></input>
            <button
              className="p-3 mb-2 rounded-lg bg-teal-600 border-solid shadow-xl hover:bg-teal-700 border-teal-900 active:shadow-md active:bg-teal-900 border-b-2 text-teal-50"
              onClick={addJournal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 flex justify-between bg-gray-400 fixed bottom-0 w-[80%] rounded-tr-xl">
          <div className="rounded-full bg-red-900">
                Hey 
          </div>
          
          
          <p>Username</p>
          <button className="p-3 mb-2 rounded-lg bg-slate-600 border-solid shadow-md hover:bg-teal-700 border-teal-900 active:shadow-md active:bg-teal-900 border-b-2 text-teal-50">
            Log out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
