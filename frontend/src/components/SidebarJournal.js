import { useState, useRef } from "react";
import journalService from "../services/journals";
import OptionsButton from "./OptionsButton";

const SidebarJournal = ({ journal, currJournal, setCurrJournal, journals, setJournals }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [journalReadOnly, setJournalReadOnly] = useState(true)
    const [editedJournalVal, setEditedJournalVal] = useState(journal.journalName)
    const inputRef = useRef()

  const handleEdit = (event) => {
    setJournalReadOnly(false)
    //focus on the element
    console.log('edit')
    console.log(journal)
    //inputRef.current.focus()
    
    //setCurrJournal(editedJournal);

  };
  const submitEdit = () => {
    // submit changes to server
    // change local on editedJournalVal
    console.log(editedJournalVal, journal.journalName)
    if (editedJournalVal !== journal.journalName) {
        let editedJournal = {...journal, journalName: editedJournalVal}
        journalService.update(journal.id, editedJournal);
        //journal = editedJournal
        console.log(editedJournal)
        console.log(journal)
        console.log(currJournal)
    }
  }
  const handleDelete = () => {
    journalService.remove(journal.id);
    alert(`${journal.journalName} and its entries have been deleted.`)
    //remove locally too
    // remove the entries from the journal collection too
    setJournals(journals.filter((j) => j.id !== journal.id))
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
        inputRef.current.blur()
    }
  };

  return (
    <div
        className = {journal === currJournal ?
        'p-2 ml-3 my-2 text-lg flex justify-between items-center bg-green-300 rounded-lg font-semibold' : 
        'p-2 ml-3 my-2 text-lg hover:bg-green-200 hover:rounded-lg active:bg-emerald-300 flex justify-between items-center'
        }
        onClick={() => setCurrJournal(journal)}
        >
        <input className="w-full bg-transparent read-only:cursor-pointer read-only:outline-none h-8" 
        onChange={(e) => setEditedJournalVal(e.target.value)}
        onKeyDown={handleEnter}
        onBlur={submitEdit}
        value={editedJournalVal}
        readOnly={journalReadOnly}
        ref={inputRef}
        ></input>
        <OptionsButton currJournal={currJournal} setCurrJournal={setCurrJournal} handleEdit={handleEdit} handleDelete={handleDelete}></OptionsButton>
        
        </div>
  );
};
export default SidebarJournal;
