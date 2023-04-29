import { useContext, useEffect, useRef, useState } from "react";

import OptionsButton from "./OptionsButton";
import Entry from "./Entry";

import { EntryContext } from "../contexts/EntryContext";
import { JournalContext } from "../contexts/JournalContext";

const EntryGroup = ({ entryGroup, setSearchVal }) => {
  const [showFullEntry, setShowFullEntry] = useState(false);
  const { entries, setEntries, currEntry, setCurrEntry } =
    useContext(EntryContext);
  const { currJournal } = useContext(JournalContext);
  const groupDate = useRef(Date(entryGroup[0]));
  useEffect(() => {
    console.log("entryGroup", entryGroup[0], entryGroup[1]);
    console.log(groupDate);
  }, []);

  return (
    <>
      <div className="text-md mx-8 mt-2 flex justify-between rounded-xl font-medium text-slate-400">
        <p className="">{entryGroup[0]}</p>
        <p>
          {`${entryGroup[1].length} ${
            entryGroup[1].length > 1 ? "entries" : "entry"
          }`}
        </p>
      </div>
      <div className="h-auto p-2">
        {entryGroup[1].map((e) => (
          <Entry entry={e} key={e.id} setSearchVal={setSearchVal}></Entry>
        ))}
      </div>
    </>
  );
};

export default EntryGroup;
