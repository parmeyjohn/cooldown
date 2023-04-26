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
    //groupBy(currJournal.entries)
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
    <div className="relative h-screen w-screen bg-slate-800 shadow-inner transition-all duration-300 ease-in-out">
      <Transition
        show={showSidebar}
        className="absolute left-0 top-0 z-50 h-full w-96"
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      </Transition>

      <div className="mx-auto flex max-w-4xl items-center justify-between p-6 text-teal-100">
        {!showSidebar && (
          <button className="xl:absolute xl:top-5 xl: left-5" onClick={() => setShowSidebar(!showSidebar)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        )}

        <h1 className=" col-span-3 justify-self-start truncate text-2xl font-semibold underline decoration-teal-500 underline-offset-1">
          {currJournal ? currJournal.journalName : ""}
        </h1>

        

        <Link
          to="/create"
          state={{
            edit: false,
          }}
        >
          <button className="mb-2 rounded-lg border-b-2 border-solid border-teal-900 bg-teal-600 p-3 text-teal-50 shadow-xl hover:bg-teal-700 active:bg-teal-900 active:shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8 justify-self-end"
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
      <div className="max-w-3xl mx-auto flex justify-between items-center text-teal-50 px-4">
        <div className=" mb-4 w-full max-w-2xl relative text-slate-500  mr-4">
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder={"Search entries..."}
          ></SearchBar>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 absolute right-3 top-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
            />
          </svg>
      </div>
      
      <div className="relative z-10 mx-auto h-full w-full max-w-4xl overflow-y-auto pb-28 ">
        <div className="h-auto w-full px-4 pb-20">
          {entries ? (
            groupBy(entries.filter(e => e.entryTitle.includes(searchValue) || e.text.includes(searchValue) || e.mediaTitle.includes(searchValue) || e.tags.includes(searchValue) ))
              .reverse()
              .map((group) => (
                <div
                  className="z-10 mb-2 h-auto w-full rounded-2xl bg-transparent pb-4"
                  key={group[0]}
                >
                  <EntryGroup entryGroup={group}></EntryGroup>
                </div>
              ))
          ) : (
            <div className="z-50 bg-red-500 text-2xl"> Add a new entry!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
