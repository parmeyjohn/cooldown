import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { EntryContext } from "./contexts/EntryContext";
import { JournalContext } from "./contexts/JournalContext";
import { UserContext } from "./contexts/UserContext";

import Entry from "./components/Entry";
import EntryForm from "./components/create-entry/EntryForm";
import Home from "./components/Home";
import Login from "./components/Login";
import Landing from "./components/Landing";
import AuthRoute from "./components/AuthRoute";

import entryService from "./services/entries";
import journalService from "./services/journals";
import loginService from "./services/login";
import EditEntryForm from "./components/EditEntryForm";
import EntryList from "./components/EntryList";

const queryClient = new QueryClient();

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
        if (fetchedJournals && fetchedJournals.length > 0) {
          console.log("in fetched journals", fetchedJournals);
          setJournals((prevJournals) => fetchedJournals);
          setCurrJournal((prevJournal) => fetchedJournals[0]);
          setEntries((prevEntries) => currJournal.entries);
        } else {
          const journalObject = {
            journalName: "journal",
            entries: [],
          };
          try {
            journalService.create(journalObject).then((newJournal) => {
              setJournals((prevJournals) => prevJournals.concat(newJournal));
              setCurrJournal((prevJournal) => newJournal);
              console.log("changed journals and set curr journal");
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    } else {
      console.log("no user");
    }
  }, [user]);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("cooldownUser");
    if (userJSON !== null) {
      const cooldownUser = JSON.parse(userJSON);
      console.log(cooldownUser);
      setUser(cooldownUser);
      journalService.setToken(cooldownUser.token);
      entryService.setToken(cooldownUser.token);
    }
  }, []);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user, setUser }}>
          <JournalContext.Provider
            value={{ journals, setJournals, currJournal, setCurrJournal }}
          >
            <EntryContext.Provider
              value={{ entries, setEntries, currEntry, setCurrEntry }}
            >
              <Router>
                <Toaster
                  position="bottom-right"
                  reverseOrder={true}
                  toastOptions={{ style: { background: "#E2E8F0" } }}
                />
                <Routes>
                  <Route path="/" element={user ? <Home /> : <Login />}>
                    <Route
                      path="/"
                      element={
                        <AuthRoute user={user}>
                          <EntryList />
                        </AuthRoute>
                      }
                    ></Route>
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
                    <Route
                      path="edit-entry"
                      element={<EditEntryForm></EditEntryForm>}
                    ></Route>
                  </Route>

                  <Route path="/landing" element={<Landing></Landing>}></Route>
                </Routes>
              </Router>
            </EntryContext.Provider>
          </JournalContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
