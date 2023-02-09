import { useState, useEffect } from "react";
import Entry from './components/Entry'
import EntryForm from './components/EntryForm'
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

  const createEntry = async (entryObj) => {
    const newEntry = await entryService.create({ entryObj })
    setEntries(entries.concat(newEntry))
    setErrorMessage('entry created')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <EntryForm createEntry={createEntry}></EntryForm>
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
