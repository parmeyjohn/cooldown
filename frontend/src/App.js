import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { EntryContext } from "./contexts/EntryContext";
import { JournalContext } from "./contexts/JournalContext";
import { UserContext } from "./contexts/UserContext";

import Entry from "./components/Entry";
import EntryForm from "./components/EntryForm";
import Home from "./components/Home";
import Login from "./components/Login";
import AuthRoute from "./components/AuthRoute";

import entryService from "./services/entries";
import journalService from "./services/journals";
import loginService from "./services/login";

const App = () => {
  const initialEntry = {
    entryTitle: "",
    mediaTitle: "",
    mediaObj: {},
    text: "",
    content: [],
    tags: [],
    startDate: "",
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

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      journalService.getAll().then((fetchedJournals) => {
        if (fetchedJournals) {
          //setJournalsExist(true);
          setJournals((prevJournals) => fetchedJournals);
          setCurrJournal((prevJournal) => fetchedJournals[0]);
          setEntries(currJournal.entries);
        } else {
          const journalObject = {
            journalName: "journal",
            entries: [],
          };
          try {
            const newJournal = journalService.create(journalObject).then(() => {
              setJournals((prevJournals) => prevJournals.concat(newJournal));
              setCurrJournal((prevJournal) => newJournal);
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
  }, [user]);

  // useEffect(() => {
  //   const userJSON = window.localStorage.getItem('cooldownUser')
  //   if (userJSON !== "null") {
  //     const cooldownUser = JSON.parse(userJSON)
  //     console.log(cooldownUser)
  //     setUser(cooldownUser)
  //     journalService.setToken(cooldownUser.token)
  //     entryService.setToken(cooldownUser.token)
  //   }
  // }, []);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <JournalContext.Provider
          value={{ journals, setJournals, currJournal, setCurrJournal }}
        >
          <EntryContext.Provider
            value={{ entries, setEntries, currEntry, setCurrEntry }}
          >
            <Router>
              <Routes>
                {user ? <Route path="/" element={<Home />}></Route>
                :
                <Route path="/" element={<Login />}></Route>
                }
                <Route
                  path="/create"
                  element={
                    <AuthRoute user={user}>
                      <EntryForm />
                    </AuthRoute>
                  }
                ></Route>
                <Route
                  path="/edit"
                  element={
                    <AuthRoute user={user}>
                      <EntryForm />
                    </AuthRoute>
                  }
                ></Route>
              </Routes>
            </Router>
          </EntryContext.Provider>
        </JournalContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
