import { useState, useEffect } from "react";
import Entry from "./components/Entry";
import EntryForm from "./components/EntryForm";
import entryService from "./services/entries";
// add login here later

const App = () => {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showJournals, setShowJournals] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  useEffect(() => {
    entryService.getAll().then((entries) => setEntries(entries));
  }, []);

  const createEntry = async (entryObj) => {
    const newEntry = await entryService.create({ entryObj });
    setEntries(entries.concat(newEntry));
    setErrorMessage("entry created");
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div className="bg-black bg-gradient-to-b from-teal-900 to-cyan-00 gradient w-screen h-screen">
      {showSidebar ? (
        <nav
          id="sidebar"
          className="hidden flex flex-col top-0 left-0 h-screen w-60 bg-gray-400 rounded-r-xl shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <form className="p-5 m-5">
            <svg
              className="inline w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input className="" name="Search" value="Search"></input>
          </form>
          <ul className="text-md font-medium p-1 divide-y divide-gray-400 ">
            <div className=" p-5 m-5 hover:bg-gray-300">
              Journals
              <button className="self-end"> + </button>
            </div>
            <li className="p-5 m-5 hover:bg-gray-300">Timeline</li>
            <li className="p-5 m-5 hover:bg-gray-300">Settings</li>
          </ul>
          <div className="bg-gray-400 fixed bottom-0 w-60 rounded-tr-xl">
            <p>username/email</p>
            <button>Log out</button>
          </div>
        </nav>
      ) : (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      )}

      <div className="flex p-6 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-teal-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-white justify-self-center mx-auto underline underline-offset-[-20%] decoration-teal-500">
          Journal
        </h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-teal-100">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
        </svg>

      </div>

      <div
        id="search-bar"
        className="flex w-full items-center mx-auto text-gray-500 focus-within:text-gray-700 "
      >
        <svg
          className="absolute ml-12 w-5 h-5 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          className="px-12 rounded-lg mx-auto border-gray-400 bg-gray-300 shadow-black h-10 w-[85%] focus-within:border-emerald-500"
          name="search"
          placeholder="Search entries"
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.value)}
        >

          
        </input>
      </div>

      
      
      <div className="w-full h-full overflow-y-auto relative z-10 pb-28 mt-10 ">
          <div className='h-auto w-screen pb-20'>
          {entries.map((e) => (
            <div className=" w-full h-auto p-4" key={e.id}>
              <Entry entry={e}></Entry>
            </div>
          ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-teal-700 to-teal-900 h-screen w-screen absolute top-56 rounded-3xl shadow-2xl -z-5 pointer-events-none">

        </div>
      
        <div className='bg-gray-400 text-teal-900 font-semibold text-lg flex justify-center items-center absolute bottom-0 left-0 h-[10%] w-full z-20'>
          <button className="bg-teal-400 rounded-2xl w-full m-5 p-3 shadow-xl tracking-wider">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 inline mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            <span>ADD ENTRY</span>
          </button>
        </div>
      
      </div>
      
      
    
  );
};

export default App;
