import { useState, useRef, useContext, useEffect } from "react";
import journalService from "../services/journals";
import entryService from "../services/entries";
import OptionsButton from "./OptionsButton";
import { JournalContext } from "../contexts/JournalContext"
import { EntryContext } from "../contexts/EntryContext"


const SidebarJournal = ({ journal }) => {
  const {journals, setJournals, currJournal, setCurrJournal} = useContext(JournalContext)
  const {setEntries} = useContext(EntryContext)
  const inputRef = useRef()
  const [journalReadOnly, setJournalReadOnly] = useState(true)
  const [editedJournalVal, setEditedJournalVal] = useState(journal.journalName)

  const handleEdit = (event) => {
    setJournalReadOnly(false)
    //TODO: fix focus on the element
    //inputRef.current.focus()
    //setCurrJournal(editedJournal);
  };

  const submitEdit = () => {
    if (editedJournalVal !== journal.journalName) {
        let editedJournal = {...journal, journalName: editedJournalVal}
        journalService.update(journal.id, editedJournal);
        //TODO: rename locally
    }
  }

  const handleDelete = () => {
    journalService.remove(journal.id)
    entryService.removeAll(journal.id)
    alert(`${journal.journalName} and its entries have been deleted.`)
    //remove locally too
    // remove the entries from the journal collection too
    setJournals(prevJournals => prevJournals.filter((j) => j.id !== journal.id))
    setEntries([])
    if (journals) {
      setCurrJournal(journals[0])
    } else {
      //TODO: fix behavior and implement setNoJournals
      console.log('No journals to display')
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
        inputRef.current.blur()
    }
  };

  return (
    <div
        className = {journal.id === currJournal.id ?
        'p-2 text-lg flex justify-between items-center bg-green-300 rounded-lg font-semibold border-b-2 border-teal-600' : 
        'p-2 text-lg hover:bg-green-200 hover:rounded-lg active:bg-emerald-300 flex justify-between items-center'
        }
        onClick={() => setCurrJournal(journal)}
        >
        <input className="w-full bg-transparent read-only:cursor-pointer read-only:outline-none" 
        onChange={(e) => setEditedJournalVal(e.target.value)}
        onKeyDown={handleEnter}
        onBlur={submitEdit}
        value={editedJournalVal}
        readOnly={journalReadOnly}
        ref={inputRef}
        ></input>
        <OptionsButton handleEdit={handleEdit} handleDelete={handleDelete}></OptionsButton>
        
        </div>
  );
};
export default SidebarJournal;
