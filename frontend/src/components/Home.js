import { useState, useEffect, useContext } from "react";
import { Transition } from "@headlessui/react";

import Sidebar from "./Sidebar";
import EntryGroup from "./EntryGroup";
import SearchBar from "./SearchBar";

import { EntryContext } from "../contexts/EntryContext";
import { JournalContext } from "../contexts/JournalContext";

import { Link } from "react-router-dom";

const Home = () => {
  const { entries, setEntries } = useContext(EntryContext);
  const { currJournal } = useContext(JournalContext);
  const [searchValue, setSearchValue] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [reverseEntries, setReverseEntries] = useState(false);

  useEffect(() => {
    console.log("in Home");
    console.log("currJournal", currJournal);
    console.log(entries);
    setEntries((prevJournal) => {
      if (currJournal) {
        return currJournal.entries
      } else {
        return []
      }
    });
  }, [currJournal]);

  const groupBy = (initialEntries) => {
    const groupedEntries = {};
    for (let i = 0; i < initialEntries.length; i++) {
      let currDate = initialEntries[i].startDate.slice(0, 10);
      if (currDate in groupedEntries) {
        groupedEntries[currDate].push(initialEntries[i]);
      } else {
        groupedEntries[currDate] = [initialEntries[i]];
      }
    }
    console.log(groupedEntries);
    return Object.entries(groupedEntries).sort((a,b) => (a[0] >= b[0] ? 1 : -1));
  };

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
          <button
            className="xl:absolute xl:left-5 xl:top-5"
            onClick={() => setShowSidebar(!showSidebar)}
          >
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

        <h1 className="truncate text-2xl font-semibold">
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
      <div className="mx-auto flex w-[90%] max-w-3xl items-center justify-between px-4 text-teal-50">
        <div className="relative mb-4 mr-4 flex w-full max-w-2xl items-center  text-slate-500">
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
            className="absolute right-3 top-3 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        {reverseEntries ? (
          <button
            onClick={() => {
              setReverseEntries(false);
              setEntries((prevEntries) => prevEntries.reverse());
            }}
            className="h-auto text-teal-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="mb-4 h-14 w-14 rounded-md p-3 hover:bg-slate-500 active:bg-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => {
              setReverseEntries(true);
              setEntries((prevEntries) => prevEntries.reverse());
            }}
            className="h-auto text-teal-100 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="mb-4 h-14 w-14 rounded-md p-3 hover:bg-slate-500 active:bg-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="relative z-10 mx-auto h-full w-full max-w-4xl overflow-y-auto  sm:px-4 pb-48">
        
          {entries && entries.length > 0 ? (
            groupBy(
              entries.filter(
                (e) =>
                  e.entryTitle.includes(searchValue) ||
                  e.text.includes(searchValue) ||
                  e.mediaTitle.includes(searchValue) ||
                  e.tags.includes(searchValue)
              )
            )
              .reverse()
              .map((group) => (
                <div
                  className="z-10 mb-2 h-auto w-full rounded-2xl bg-transparent pb-4"
                  key={group[0]}
                >
                  <EntryGroup
                    entryGroup={group}
                    setSearchVal={setSearchValue}
                  ></EntryGroup>
                </div>
              ))
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center pb-20">
              <img
                className="h-64 w-72"
                src={require("../assets/no_entries.png")}
                alt="empty journal"
              ></img>
              <div
                id="title"
                className="text-center text-2xl font-semibold text-white"
              >
                Your journal is empty...
              </div>
              <p className="text-center text-teal-100">
                Start cooling down and add your first entry!
              </p>
            </div>
          )}
        </div>
      </div>
  );
};

export default Home;
