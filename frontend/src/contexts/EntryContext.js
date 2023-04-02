import { createContext } from "react"

export const EntryContext = createContext({entries: [], setEntries: () => {}, currEntry: {}})