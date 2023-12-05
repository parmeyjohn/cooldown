import { useState, useEffect, useContext } from "react";
import { Transition } from "@headlessui/react";

import { ReactComponent as SortAscendingIcon } from "../assets/heroicons/ascending.svg";
import { ReactComponent as SortDescendingIcon } from "../assets/heroicons/descending.svg";
import { ReactComponent as PlusIcon } from "../assets/heroicons/plus.svg";
import { ReactComponent as EditSquareIcon } from "../assets/heroicons/edit-square.svg";
import { ReactComponent as HamburgerIcon } from "../assets/heroicons/hamburger.svg";

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
        return currJournal.entries;
      } else {
        return [];
      }
    });
  }, [currJournal]);

  useEffect(() => {}, [entries]);
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
    return Object.entries(groupedEntries);
  };

  return (
    <div className="relative h-screen w-screen bg-gradient-to-t from-slate-900 to-slate-800">
      <Transition
        show={showSidebar}
        className="absolute top-0 left-0 z-50 h-full w-96"
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      </Transition>

      <div
        id="header"
        className="mx-auto max-w-4xl rounded-b-xl px-4 pt-8 xl:px-8 xl:pt-4"
      >
        <div className="flex max-w-4xl items-center justify-between py-2 text-slate-300">
          {showSidebar ? (
            <div className="h-8 w-8 p-2 xl:absolute xl:left-5 xl:top-5"></div>
          ) : (
            <button
              id="menu-button"
              className="rounded-md p-2 hover:bg-slate-500 active:bg-slate-400 xl:absolute xl:left-5 xl:top-5"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <HamburgerIcon></HamburgerIcon>
            </button>
          )}

          <h1 className="truncate text-xl font-semibold ">
            {currJournal ? currJournal.journalName : "journal"}
          </h1>
          <div className="flex items-center justify-end gap-4">
            <button
              id="create-entry-button"
              className="hidden rounded-lg  p-2 hover:bg-slate-500 active:bg-slate-400"
            >
              <EditSquareIcon></EditSquareIcon>
            </button>

            <Link
              to="/create"
              state={{
                edit: false,
              }}
            >
              <button
                id="create-entry-button"
                className="flex items-center justify-center rounded-lg border-b-2 border-solid border-teal-900 bg-teal-600 p-2 text-teal-50 shadow-xl hover:bg-teal-700 active:bg-teal-900 active:shadow-md"
              >
                <span className="hidden px-2 md:block">Create Entry</span>
                <PlusIcon></PlusIcon>
              </button>
            </Link>
          </div>
        </div>

        <div className="my-4 flex max-w-4xl items-center justify-between py-4 text-teal-50 xl:py-0">
          <div className="relative mr-4 flex w-full max-w-3xl items-center text-slate-500">
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              placeholder={"Search entries..."}
              showIcon={true}
            ></SearchBar>
          </div>

          {reverseEntries ? (
            <button
              onClick={() => {
                setReverseEntries(false);
                setEntries((prevEntries) => [...prevEntries].reverse());
              }}
              className="rounded-md p-2 text-teal-100 hover:bg-slate-500 active:bg-slate-400"
            >
              <SortDescendingIcon></SortDescendingIcon>
            </button>
          ) : (
            <button
              onClick={() => {
                setReverseEntries(true);
                setEntries((prevEntries) => [...prevEntries].reverse());
              }}
              className="rounded-md p-2 text-teal-100 hover:bg-slate-500 active:bg-slate-400 "
            >
              <SortAscendingIcon></SortAscendingIcon>
            </button>
          )}
        </div>
      </div>

      <div
        data-cy="entries-div"
        className="relative z-10 mx-auto h-full w-full max-w-4xl overflow-y-auto pb-48 sm:px-4"
      >
        {entries && entries.length > 0 ? (
          groupBy(
            entries.filter(
              (e) =>
                e.entryTitle.includes(searchValue) ||
                e.text.includes(searchValue) ||
                e.mediaTitle.includes(searchValue) ||
                e.tags.includes(searchValue)
            )
          ).map((group) => (
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
