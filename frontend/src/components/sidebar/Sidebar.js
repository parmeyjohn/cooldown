import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { ReactComponent as Logo } from "../../assets/logo_v4.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/heroicons/left-arrow.svg";
import { ReactComponent as SearchIcon } from "../../assets/heroicons/search.svg";
import { ReactComponent as BookIcon } from "../../assets/heroicons/book.svg";
import { ReactComponent as PlusIcon } from "../../assets/heroicons/plus.svg";
import { ReactComponent as StatsIcon } from "../../assets/heroicons/stats.svg";
import { ReactComponent as UserIcon } from "../../assets/heroicons/user.svg";
import { ReactComponent as SettingsIcon } from "../../assets/heroicons/settings.svg";

import journalService from "../../services/journals";
import SearchBar from "../SearchBar";
import SidebarJournal from "./SidebarJournal";
import Settings from "./Settings";

import { JournalContext } from "../../contexts/JournalContext";
import { UserContext } from "../../contexts/UserContext";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const [newJournalName, setNewJournalName] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const { journals, setJournals, currJournal, setCurrJournal } =
    useContext(JournalContext);
  const [journalSearchVal, setJournalSearchVal] = useState("");
  const { user } = useContext(UserContext);
  let navigate = useNavigate();

  const addJournal = async (event) => {
    event.preventDefault();
    if (newJournalName.length > 1) {
      const journalObject = {
        journalName: newJournalName,
        entries: [],
      };
      try {
        const newJournal = await journalService.create(journalObject);
        console.log(newJournal);
        setJournals((prevJournals) => prevJournals.concat(newJournal));
        setCurrJournal((prevJournal) => newJournal);
        setNewJournalName("");
        toast("Journal created!", { icon: "✔", duration: 4000 });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      addJournal(event);
    }
  };

  return (
    <div
      id="sidebar"
      className="w-max-sm absolute top-0 left-0 flex h-full w-[80%] max-w-sm flex-col bg-slate-200 pb-8"
    >
      {showSettings ? (
        <Settings setShowSettings={setShowSettings}></Settings>
      ) : (
        <></>
      )}
      <div
        id="navigation"
        className="flex w-full items-center justify-between border-b-2 border-solid border-slate-300 text-slate-800"
      >
        <div className="flex items-center justify-start px-5">
          <Logo className="h-8 w-8"></Logo>
          <h1 className="title ml-1 py-8 text-2xl font-semibold">Cooldown</h1>
        </div>

        <button onClick={() => setShowSidebar(false)} className="">
          <LeftArrowIcon className="mr-5 h-12 w-12 stroke-[1.5] p-2 text-slate-800 hover:rounded-lg hover:bg-slate-400 active:bg-slate-500"></LeftArrowIcon>
        </button>
      </div>

      <div className="flex h-full flex-col justify-between">
        <div id="journalList" className="h-full">
          <div className="flex items-center justify-start pt-2 pl-4 pb-2 text-slate-500">
            <SearchIcon className="h-5 w-5 stroke-[1.75]"></SearchIcon>
            <h2 className="text-md ml-2 h-6 font-medium  ">Search:</h2>
          </div>
          <div id="journalSearch" className="ml-2 px-4 py-2">
            <SearchBar
              placeholder={"Search journals..."}
              searchValue={journalSearchVal}
              setSearchValue={setJournalSearchVal}
            ></SearchBar>
          </div>
          <div className="flex items-center justify-start pt-2 pl-4 pb-2 text-slate-500">
            <BookIcon className="h-5 w-5 stroke-[1.5]"></BookIcon>
            <h2 className="text-md ml-2 h-6 font-medium  ">Journals:</h2>
          </div>

          <div
            data-cy="journals-div"
            className="mr-4 ml-8 h-[80%] max-h-96 overflow-y-auto rounded-xl "
          >
            {journals
              .filter((x) =>
                x.journalName.toLowerCase().includes(journalSearchVal)
              )
              .map((j) => (
                <SidebarJournal key={j.id} journal={j}></SidebarJournal>
              ))}
          </div>
        </div>

        <div
          id="newJournal"
          className="flex justify-between border-b-2 border-solid border-slate-300 py-4 px-4 pl-4"
        >
          <input
            className="ml-2 mb-2 w-[75%] rounded-lg bg-slate-300 p-2 shadow-inner  shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
            type="text"
            data-cy="input-journal-name"
            name="new-journal"
            placeholder="Add a journal..."
            value={newJournalName}
            onChange={(e) => setNewJournalName(e.target.value)}
            onKeyDown={handleEnter}
            autoComplete="off"
          ></input>

          <button
            className="mb-2 rounded-lg border-b-2 border-solid border-teal-900 bg-teal-600 p-3 text-teal-50 shadow-xl hover:bg-teal-700 active:bg-teal-900 active:shadow-md"
            onClick={addJournal}
            data-cy="add-journal-button"
          >
            <PlusIcon className="h-6 w-6 stroke-[2]"></PlusIcon>
          </button>
        </div>

        <div className="flex items-center justify-start pt-2 pl-4 pb-2 text-slate-500 ">
          <StatsIcon className="h-5 w-5 stroke-[1.5]"></StatsIcon>
          <h2 className="text-md ml-2 h-6 font-medium  ">Statistics:</h2>
        </div>

        <div className="h-24 w-full overflow-y-auto border-b-2 border-solid border-slate-300 px-8">
          <button
            onClick={() => navigate("stats")}
            className="mb-2 w-full rounded-lg border-b-2 border-solid border-teal-900 bg-teal-600 p-3 font-medium text-teal-50 hover:bg-teal-700 active:bg-teal-900"
          >
            View All
          </button>
        </div>

        <div className="flex w-full items-center justify-between rounded-tr-xl p-4">
          <div className="flex items-center justify-start">
            <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-solid border-teal-900 bg-slate-100 p-2 text-teal-800">
              <UserIcon className="h-8 w-8 stroke-[1.5]"></UserIcon>
            </div>
            <div className="mr-4 text-left">
              <h3 className="text-lg font-medium">User</h3>
              <h3 className="truncate text-lg">@{user.username}</h3>
            </div>
          </div>
          <SettingsIcon
            onClick={() => setShowSettings(true)}
            className="h-12 w-12 cursor-pointer stroke-[1.25] p-2 hover:rounded-lg hover:bg-slate-400 active:bg-slate-500"
            id="user-settings-button"
          ></SettingsIcon>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
