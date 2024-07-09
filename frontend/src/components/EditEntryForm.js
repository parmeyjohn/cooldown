import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import OptionsButton from "./OptionsButton";
import Tag from "./shared/Tag";

import { EntryContext } from "../contexts/EntryContext";
import { JournalContext } from "../contexts/JournalContext";

import entryService from "../services/entries";
import journalService from "../services/journals";
import InputBar from "./InputBar";

const EditEntryForm = ({ entry, setSearchVal }) => {
  const [showFullEntry, setShowFullEntry] = useState(false);
  const { setEntries, setCurrEntry } = useContext(EntryContext);
  const { currJournal, setJournals } = useContext(JournalContext);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h2 className="text-emerald-200">New Entry:</h2>
      <div className="h-80 w-full rounded-lg bg-teal-100 p-4">
        <div></div>
        <InputBar label="title" inputName="title"></InputBar>
      </div>
    </div>
  );
};

export default EditEntryForm;
