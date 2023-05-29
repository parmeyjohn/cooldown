import { useState, useRef, useContext, useEffect } from "react";
import journalService from "../services/journals";
import entryService from "../services/entries";
import OptionsButton from "./OptionsButton";
import { JournalContext } from "../contexts/JournalContext";
import { EntryContext } from "../contexts/EntryContext";

const SidebarJournal = ({ journal }) => {
  const { journals, setJournals, currJournal, setCurrJournal } =
    useContext(JournalContext);
  const { setEntries } = useContext(EntryContext);
  const inputRef = useRef();
  const [journalReadOnly, setJournalReadOnly] = useState(true);
  const [editedJournalVal, setEditedJournalVal] = useState(journal.journalName);

  const handleEdit = (event) => {
    setJournalReadOnly((prevVal) => false);
    setTimeout(() => {
      inputRef.current.focus();
    });
  };

  const submitEdit = () => {
    setJournalReadOnly(true);
    if (editedJournalVal !== journal.journalName) {
      let editedJournal = { ...journal, journalName: editedJournalVal };
      journalService.update(journal.id, editedJournal);
      console.log(journals);
      setJournals((prevJournals) =>
        prevJournals.map((j) => {
          if (j === journal) {
            return editedJournal;
          } else {
            return j;
          }
        })
      );
      setCurrJournal((prevJournal) => editedJournal);
      console.log(journals);
    }
  };

  const handleDelete = () => {
    if (journals.length < 2) {
      return;
    }
    journalService.remove(journal.id);
    entryService.removeAll(journal.id);
    alert(`${journal.journalName} and its entries have been deleted.`);
    setJournals((prevJournals) =>
      prevJournals.filter((j) => j.id !== journal.id)
    );
    setEntries([]);
    setCurrJournal(journals[0]);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      inputRef.current.blur();
    }
  };

  return (
    <div
      key={journal.id}
      className={
        journal.id === currJournal.id
          ? "flex items-center justify-between rounded-lg border-b-2 border-teal-600 bg-green-300 p-2 text-lg font-semibold"
          : "flex items-center justify-between p-2 text-lg hover:rounded-lg hover:bg-green-200 active:bg-emerald-300"
      }
      onClick={() => setCurrJournal(journal)}
    >
      <input
        data-cy='input-edit-journal'
        className="w-full bg-transparent read-only:cursor-pointer read-only:outline-none focus-within:outline-none"
        onChange={(e) => setEditedJournalVal(e.target.value)}
        onKeyDown={handleEnter}
        onBlur={submitEdit}
        value={editedJournalVal}
        readOnly={journalReadOnly}
        ref={inputRef}
      ></input>

      <OptionsButton
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      ></OptionsButton>
    </div>
  );
};
export default SidebarJournal;
