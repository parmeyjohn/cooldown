import { useState, useContext, useRef, useEffect } from "react";
import journalService from "../services/journals";
import SearchBar from "./SearchBar";
import SidebarJournal from "./SidebarJournal";
import { JournalContext } from "../contexts/JournalContext";
import { UserContext } from "../contexts/UserContext";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const [newJournalName, setNewJournalName] = useState("");
  const { journals, setJournals, currJournal, setCurrJournal } = useContext(JournalContext);
  const { user } = useContext(UserContext);

  const addJournal = async (event) => {
    event.preventDefault();
    if (newJournalName.length > 1) {
      const journalObject = {
        journalName: newJournalName,
        entries: []
      };
      try {
        const newJournal = await journalService.create(journalObject);
        console.log(newJournal)
        setJournals((prevJournals) => prevJournals.concat(newJournal));
        setNewJournalName("");
      } catch (e) {
        console.log(e)
      }
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
        className="absolute top-0 left-0 flex flex-col h-screen w-[80%] bg-slate-200 shadow-md"
      >
        <div id="navigation" className="w-full flex justify-between border-solid border-b-2 border-slate-300">
          <h1 className="text-2xl font-semibold p-8">Cooldown</h1>
          <button onClick={() => setShowSidebar(false)} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 mr-10 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
          
        <div className="flex flex-col h-full justify-between">
          
          
          <div id="journalList" className="h-full">
            <div id="journalSearch" className="px-4 ml-2 py-2">
              <SearchBar placeholder={"Search journals..."}></SearchBar>
            </div>
            <div className="flex justify-start items-center pt-2 pl-4 pb-2 text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <h2 className="text-md font-medium h-6 ml-2  ">Journals:</h2>
            </div>
            
            <div className="h-[80%] overflow-y-auto mr-4 ml-8 rounded-xl ">
              <div className="overflow-y-auto">
                {journals.map((j) => (
                  <SidebarJournal key={j.id} journal={j}></SidebarJournal>
                ))}
              </div>

              
            </div>
          </div>
          
          <div>
            <div id="newJournal" className="flex justify-between pl-4 py-4 px-4 border-solid border-b-2 border-slate-300">
                <input
                  className="bg-slate-300 p-2 mb-2 w-full shadow-inner shadow-slate-400  outline-8 focus:outline-offset-1 focus:outline-teal-700 focus:bg-teal-50 focus:shadow-none rounded-lg"
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
          
              <div className="p-4 flex justify-between items-center w-full rounded-tr-xl">
            <div className="flex items-center justify-start">
              <div className="flex items-center justify-center rounded-xl h-14 w-14 p-2 mr-4 bg-slate-100 border-solid border-2 border-teal-900 text-teal-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <div className="text-left mr-4">
                <h3 className="text-lg font-medium">{user.name}</h3>
                <h3 className="text-lg ">@{user.username}</h3>
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 p-2 hover:bg-slate-400 hover:rounded-lg active:bg-slate-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          
          
          </div>


          
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
