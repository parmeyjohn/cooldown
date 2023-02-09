import { useState, useEffect } from "react";
import Entry from './components/Entry'
import entryService from "./services/entries";
// add login here later

const App = () => {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    entryService.getAll().then((entries) => setEntries(entries));
  }, []);

  return (
    <div>
      <h1>Entries</h1>
      {entries.map((e) => (
        <div key={e.id}>
          <Entry entry={e}></Entry>
        </div>
      ))}
    </div>
  );
};

export default App;
