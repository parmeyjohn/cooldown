import { useState, useEffect, useContext } from "react";
import { Transition } from "@headlessui/react";

import { ReactComponent as PlusIcon } from "../assets/heroicons/plus.svg";
import { ReactComponent as EditSquareIcon } from "../assets/heroicons/edit-square.svg";
import { ReactComponent as HamburgerIcon } from "../assets/heroicons/hamburger.svg";
import { BsJournalBookmark as JournalIcon } from "react-icons/bs";

import Sidebar from "./Sidebar";

import { EntryContext } from "../contexts/EntryContext";
import { JournalContext } from "../contexts/JournalContext";

import { Link, Outlet } from "react-router-dom";

const Home = () => {
  const { entries, setEntries } = useContext(EntryContext);
  const { currJournal } = useContext(JournalContext);

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
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

          <h1 className="flex items-center gap-2 truncate text-2xl font-semibold">
            <JournalIcon className="h-8 w-8 p-1"></JournalIcon>
            {currJournal ? currJournal.journalName : "journal"}
          </h1>
          <div className="flex items-center justify-end gap-4">
            <button
              id="edit-entry-button"
              className="hidden rounded-lg p-2 hover:bg-slate-500 active:bg-slate-400"
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
                <PlusIcon></PlusIcon>
                <span className="hidden px-2 md:block">Create Entry</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="h-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
