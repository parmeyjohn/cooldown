import { createContext } from "react";

export const EntryContext = createContext({
  journals: [],
  setEntries: () => {},
  currEntry: {},
  setCurrEntry: () => {},
});
