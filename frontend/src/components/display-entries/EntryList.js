import { useContext, useEffect, useState, useMemo } from "react";

import dayjs from "../../dayjs.config";

import { ReactComponent as SortAscendingIcon } from "../../assets/heroicons/ascending.svg";
import { ReactComponent as SortDescendingIcon } from "../../assets/heroicons/descending.svg";

import SearchBar from "../SearchBar";
import EntryGroup from "./EntryGroup";

import { EntryContext } from "../../contexts/EntryContext";

const groupByDate = (entries) => {
  const groups = {};
  // traverse over groups backwards so the times are in order
  for (let i = entries.length - 1; i >= 0; i--) {
    const currDate = dayjs(entries[i].startDate).format("YYYY-MM-DDT");
    if (!groups[currDate]) {
      groups[currDate] = [];
    }
    groups[currDate].push(entries[i]);
  }
  console.log(groups);
  return Object.entries(groups);
};

// TODO: Insert elements into sorted spot on insert
// TODO: Add debouncing and pagination on searching

const EntryList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortReverse, setSortReverse] = useState(true);

  const { entries, setEntries } = useContext(EntryContext);

  const filteredEntries = useMemo(() => {
    const resultEntries = groupByDate(
      entries
        .filter(
          (e) =>
            e.entryTitle.toLowerCase().includes(searchValue) ||
            e.text.toLowerCase().includes(searchValue) ||
            e.mediaTitle.toLowerCase().includes(searchValue) ||
            e.tags.includes(searchValue)
        )
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    );
    return sortReverse ? resultEntries.reverse() : resultEntries;
  }, [entries, searchValue, sortReverse]);

  return (
    <>
      <div className="mx-auto flex max-w-4xl gap-4 rounded-b-xl px-8 pt-8 pb-4">
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder={"Search entry titles or text..."}
          showIcon={true}
        ></SearchBar>

        {sortReverse ? (
          <button
            onClick={() => {
              setSortReverse(false);
              setEntries((prevEntries) => [...prevEntries].reverse());
            }}
            className="rounded-md p-2 text-teal-100 hover:bg-slate-500 active:bg-slate-400"
          >
            <SortDescendingIcon></SortDescendingIcon>
          </button>
        ) : (
          <button
            onClick={() => {
              setSortReverse(true);
              setEntries((prevEntries) => [...prevEntries].reverse());
            }}
            className="rounded-md p-2 text-teal-100 hover:bg-slate-500 active:bg-slate-400 "
          >
            <SortAscendingIcon></SortAscendingIcon>
          </button>
        )}
      </div>

      <div
        data-cy="entries-div"
        className="relative z-10 mx-auto h-full w-full max-w-4xl overflow-y-auto pb-48 sm:px-4"
      >
        {entries && entries.length > 0 ? (
          filteredEntries.map((group) => (
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
              src={require("../../assets/no_entries.png")}
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
    </>
  );
};

export default EntryList;
