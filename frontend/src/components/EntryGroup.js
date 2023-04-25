import { useContext, useEffect, useRef, useState } from "react";

import OptionsButton from "./OptionsButton";
import Entry from "./Entry"

import { EntryContext } from "../contexts/EntryContext";
import { JournalContext } from "../contexts/JournalContext";

const EntryGroup = ({ entryGroup }) => {
  const [showFullEntry, setShowFullEntry] = useState(false);
  const { entries, setEntries, currEntry, setCurrEntry } = useContext(EntryContext);
  const { currJournal } = useContext(JournalContext);
  const groupDate = useRef(Date(entryGroup[0]))
    useEffect(() => {
        console.log('entryGroup',entryGroup[0], entryGroup[1])
        console.log(groupDate)
    }, [])

  return (
    <>
      <div className="flex justify-between text-md text-slate-400 font-medium mt-2 mx-8 rounded-xl">
        <p className="">{entryGroup[0]}</p>
        <p>
        {`${entryGroup[1].length} ${entryGroup[1].length > 1 ? 'entries' : 'entry'}`}
        </p>
      </div>
    <div className="h-auto p-2">
        {entryGroup[1].map((e) => (
            <Entry entry={e} key={e.id}></Entry>
        ))}
    </div>       
    </>
  );
};

export default EntryGroup;
