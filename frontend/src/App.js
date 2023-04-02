import { useState, useEffect } from "react";
import Entry from "./components/Entry";
import EntryForm from "./components/EntryForm";
import Home from "./components/Home"
import entryService from "./services/entries";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import { EntryContext } from "./contexts/EntryContext";

// add login here later

const App = () => {

  const initialEntry = {
    entryTitle: "",
    mediaTitle: "",
    text: "",
    content: [],
    tags: [],
    startDate: new Date().toISOString().slice(0, 16),
  }
  const [entries, setEntries] = useState([])
  const [currEntry, setCurrEntry] = useState(initialEntry)
  
// '/' if user is logged in go to all entries if not go to login/landing page
//'/{journal name}' shows all the entries for a given journal
//'/{journal name}/{id} shows edit page for entry at a given id

// navbar:
// all entries
// map journal to each have their own button, overflow y auto
// Settings (go to settings page)
  return (
    <div>
      <nav>
        <Router>
          <div>
            
            <Link></Link>
            <Link></Link>
          </div>
          <EntryContext.Provider value={{entries, setEntries, currEntry, setCurrEntry}}>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/create' element={<EntryForm />}></Route>
              <Route path='/edit' element={<EntryForm />}></Route>

            </Routes>
          </ EntryContext.Provider>
        </Router>
      </nav>
    </div>
      
      
      
      
    
  );
};

export default App;
