import { createContext } from "react";

export const JournalContext = createContext({
  journals: [],
  setJournals: () => {},
  currJournal: {},
  setCurrJournal: () => {},
});
