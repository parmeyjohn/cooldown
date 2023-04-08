import { useState, useEffect } from "react";
import Entry from "./components/Entry";
import EntryForm from "./components/EntryForm";
import Home from "./components/Home";
import entryService from "./services/entries";
import journalService from "./services/journals";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { EntryContext } from "./contexts/EntryContext";
import { JournalContext } from "./contexts/JournalContext";

// add login here later

const App = () => {
  const initialEntry = {
    entryTitle: "",
    mediaTitle: "",
    text: "",
    content: [],
    tags: [],
    startDate: '',
  };

  const initialJournal = {
    journalName: "",
    entries: [],
  };

  const [entries, setEntries] = useState([]);
  const [currEntry, setCurrEntry] = useState(initialEntry);
  const [journals, setJournals] = useState([]);
  const [currJournal, setCurrJournal] = useState(initialJournal);
  const [journalsExist, setJournalsExist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      journalService.getAll().then((fetchedJournals) => {
        if (fetchedJournals) {
          setJournalsExist(true);
          setJournals(prevJournals => fetchedJournals);
          setCurrJournal(prevJournal => fetchedJournals[0]);
          setEntries(currJournal.entries);
        } else {
          console.log("no journals");
        }
        setIsLoading(false);
      });
  }, []);

  // '/' if user is logged in go to all entries if not go to login/landing page
  //'/{journal name}' shows all the entries for a given journal
  //'/{journal name}/{id} shows edit page for entry at a given id

  // navbar:
  // all entries
  // map journal to each have their own button, overflow y auto
  // Settings (go to settings page)
  return (
    <div>
      <JournalContext.Provider
        value={{ journals, setJournals, currJournal, setCurrJournal }}
      >
        <EntryContext.Provider
          value={{ entries, setEntries, currEntry, setCurrEntry }}
        >
            <Router>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/create" element={<EntryForm />}></Route>
                <Route path="/edit" element={<EntryForm />}></Route>
              </Routes>
            </Router>
        </EntryContext.Provider>
      </JournalContext.Provider>
    </div>
  );
};

export default App;
