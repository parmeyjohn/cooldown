import { useState, useEffect, useContext, createContext } from "react";
import { Transition } from '@headlessui/react'

import Entry from "./Entry";
import Sidebar from "./Sidebar";
import EntryForm from "./EntryForm";
import EntryGroup from "./EntryGroup";
import SearchBar from "./SearchBar";

import { EntryContext } from "../contexts/EntryContext"
import { JournalContext } from "../contexts/JournalContext"

import journalService from "../services/journals";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const Home = () => {
  const {entries, setEntries} = useContext(EntryContext)
  const {journals, setJournals, currJournal, setCurrJournal} = useContext(JournalContext)
  const [errorMessage, setErrorMessage] = useState("");
  const [showJournals, setShowJournals] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    console.log('in Home')
    console.log('currJournal', currJournal)
    groupBy(currJournal.entries)
    setEntries(prevJournal => currJournal.entries);
  }, [currJournal]);

  const groupBy = (initialEntries) => {
    const groupedEntries = {}
    for (let i = 0; i < initialEntries.length; i++) {
      let currDate = initialEntries[i].startDate.slice(0,10)
      if (currDate in groupedEntries) {
        groupedEntries[currDate].push(initialEntries[i])
      } else {
        groupedEntries[currDate] = [initialEntries[i]]
      }
    } 
    console.log(groupedEntries)
    return Object.entries(groupedEntries)
  }
  
  return (
    <div className="relative transition-all ease-in-out duration-300 bg-slate-800 shadow-inner w-screen h-screen">
      <Transition
        show={showSidebar}
        className="absolute left-0 top-0 h-full w-full z-50"
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      </Transition>

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
          {currJournal ? currJournal.journalName : ""}
        </h1>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 justify-self-end"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
          />
        </svg>

        <Link
          to="/create"
          state={{
            edit: false,
          }}
        >
          <button className="p-3 mb-2 rounded-lg bg-teal-600 border-solid shadow-xl hover:bg-teal-700 border-teal-900 active:shadow-md active:bg-teal-900 border-b-2 text-teal-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 justify-self-end"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </Link>
      </div>

      <div className="mx-auto w-[80%]">
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder={"Search entries..."}
        ></SearchBar>
      </div>
      <div className="w-full h-full overflow-y-auto relative z-10 pb-28 ">
        <div className="h-auto w-screen pb-20 p-4">
          {entries ? (
            groupBy([...entries].sort((a, b) => a.startDate < b.startDate)).map(
              (group) => (
                <div className="pb-4 mb-8 w-full h-auto z-10 bg-teal-700 rounded-2xl shadow-2xl" key={group[0]}>
                  <EntryGroup entryGroup={group}></EntryGroup>
                </div>
              )
            )
          ) : (
            <div className="text-2xl bg-red-500 z-50"> Add a new entry!</div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Home;
