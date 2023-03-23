import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import journalService from "../services/journals";

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
        
        <h2 className="text-lg pb-1 font-medium mx-4 p-4">All Journals:</h2>
        <div className=" mx-4 p-2 h-80 shadow-inner shadow-slate-400 bg-slate-300 rounded-xl ">
          
          <div className=" overflow-y-auto h-40" >
            {journals.map((j) => (
              <div
                className = {j === currJournal ?
                'p-2 ml-3 my-2 text-lg flex justify-between items-center bg-green-300 rounded-lg font-semibold' : 
                'p-2 ml-3 my-2 text-lg hover:bg-green-200 hover:rounded-lg active:bg-emerald-300 flex justify-between items-center'
                }
                key={j.id}
                onClick={() => setCurrJournal(j)}
              >
                <span className="w-full">{j.journalName}</span>
                
                <button className="w-fit" onClick={() => console.log('hey')}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 mr-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between pl-4 py-4">
            <input
              className="bg-transparent py-2 px-2 mb-2 w-[80%] border-2 border-teal-800 rounded-lg focus:bg-teal-100"
              type="text"
              name="new-journal"
              placeholder="Add a journal..."
              value={newJournalName}
              onChange={(e) => setNewJournalName(e.target.value)}
              onKeyDown={handleEnter}
            ></input>
            <button
              className="justify-self-end p-3 mb-2 rounded-lg bg-teal-600 border-solid shadow-xl hover:bg-teal-700 border-teal-900 active:shadow-md active:bg-teal-900 border-b-2 text-teal-50"
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
          <p>username/email</p>
          <button className="p-3 mb-2 rounded-lg bg-slate-600 border-solid shadow-md hover:bg-teal-700 border-teal-900 active:shadow-md active:bg-teal-900 border-b-2 text-teal-50">
            Log out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
