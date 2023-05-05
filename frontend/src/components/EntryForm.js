import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Textbox from "./Textbox";
import Tag from "./Tag";
import SearchAPI from "./SearchAPI";

import { EntryContext } from "../contexts/EntryContext";
import { JournalContext } from "../contexts/JournalContext";

import entryService from "../services/entries";
import journalService from "../services/journals";

const EntryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setEntries, currEntry, setCurrEntry } = useContext(EntryContext);
  const { currJournal, setCurrJournal, setJournals } =
    useContext(JournalContext);

  const [entryTitle, setEntryTitle] = useState(currEntry.entryTitle);
  const [mediaTitle, setMediaTitle] = useState(currEntry.mediaTitle);
  const [mediaObj, setMediaObj] = useState(currEntry.mediaObj);
  const [text, setText] = useState(currEntry.text);
  const [content, setContent] = useState(currEntry.content);
  const [tags, setTags] = useState(currEntry.tags);
  const [startDate, setStartDate] = useState(() => {
    if (currEntry.startDate) {
      return currEntry.startDate;
    } else {
      var currTime = new Date();
      var offset = currTime.getTimezoneOffset() * 60 * 1000;
      const newTime = new Date(currTime - offset);
      console.log(newTime);
      return newTime.toISOString();
    }
  });
  const [currTag, setCurrTag] = useState("");

  const saveEntry = async (event) => {
    event.preventDefault();
    if (entryTitle === "") {
      return;
    }
    const entryObject = {
      entryTitle,
      mediaTitle,
      mediaObj,
      startDate,
      text,
      content,
      tags,
      journalId: currJournal.id,
    };

    if (location.state.edit) {
      //edit
      try {
        const newEntry = await entryService.update(currEntry.id, entryObject);
        const newJournal = {
          ...currJournal,
          entries: currJournal.entries.concat(newEntry),
        };
        setJournals((prevJournals) =>
          prevJournals.map((j) => {
            if (j.id === newJournal.id) {
              return newJournal;
            } else {
              return j;
            }
          })
        );
        setEntries((prevEntries) =>
          prevEntries.filter((e) => e.id !== currEntry.id).concat(newEntry)
        );
        setCurrJournal((prevJournal) => ({
          ...prevJournal,
          entries: prevJournal.entries
            .filter((e) => e !== currEntry)
            .concat(newEntry),
        }));

        alert("entry updated");
      } catch (e) {
        console.log(e);
      }
    } else {
      //add the entry
      try {
        const newEntry = await entryService.create(entryObject);
        const newJournal = {
          ...currJournal,
          entries: currJournal.entries.concat(newEntry),
        };
        journalService.update(currJournal.id, {
          $push: { entries: newEntry.id },
        });
        // updating current entries
        setEntries((prevEntries) => prevEntries.concat(newEntry));
        // updating the entries in the current journal
        setCurrJournal((prevJournal) => newJournal);
        // updating the journal array to include the newly updated journal
        setJournals((prevJournals) => prevJournals.map((j) => {
          if (j.id === newJournal.id) {
            return newJournal
          } else {
            return j
          }
        }));

        alert("entry created");
      } catch (e) {
        console.log(e);
      }
    }
    setCurrEntry({
      entryTitle: "",
      mediaTitle: "",
      mediaObj: {},
      text: "",
      content: [],
      tags: [],
      startDate: "",
    });
    navigate(-1);
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag, i) => tag !== tagToRemove));
  };

  const addTag = () => {
    if (currTag.length > 1) {
      setTags((prevTag) => [currTag].concat(tags));
      setCurrTag((prevCurrTag) => "");
    }
  };

  const handleEnter = (e) => {
    console.log(currTag);
    console.log(tags);
    console.log(currEntry);
    if (e.key === "Enter") {
      addTag();
    }
  };

  const setFormatDate = (dateString) => {
    console.log('date str', dateString)
    var currTime = new Date(dateString);
    console.log('curr time', currTime)
    var offset = currTime.getTimezoneOffset() * 60 * 1000;
    const newTime = new Date(currTime - offset);
    console.log('new time', newTime)
    setStartDate(newTime.toISOString());
  };

  return (
    <div className="flex h-screen w-screen flex-col justify-between overflow-y-auto bg-gradient-to-b from-teal-50 to-teal-100">
      <div className=" mx-auto flex h-auto w-full  max-w-4xl flex-col justify-start text-teal-900">
        <div className="flex w-full items-center justify-between px-4 py-6">
          <h1 className=" mx-4 h-8">{currJournal.journalName}</h1>
          <button
            onClick={() => {
              setCurrEntry({
                entryTitle: "",
                mediaTitle: "",
                mediaObj: {},
                text: "",
                content: [],
                tags: [],
                startDate: "",
              });
              navigate(-1);
            }}
            className="mr-2 h-10 w-10 justify-self-end rounded-lg p-1 hover:bg-slate-300 active:bg-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className=" "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex w-full items-center px-4 text-gray-500 focus-within:text-gray-700  ">
          <input
            className="mt-2 mb-2 h-14 w-full rounded-lg bg-transparent p-3 text-3xl font-semibold decoration-teal-700 underline-offset-4 focus:underline focus:outline-none "
            autoFocus
            name="title"
            placeholder="Untitled"
            autoComplete="off"
            value={entryTitle}
            onChange={(e) => setEntryTitle(e.target.value)}
          ></input>
        </div>

        <div className="mx-2 flex flex-col px-4 text-left text-lg ">
          <label className="text-base px-2 font-semibold">Date:</label>
          <input
            className="mt-1 mb-2 rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
            onChange={(e) => {
              setFormatDate(e.target.value);
            }}
            type="datetime-local"
            name="start-time"
            value={startDate.slice(0, 16)}
          ></input>
          <label className="text-base px-2 font-semibold">Media:</label>

          <div className="relative flex text-teal-900">
            <SearchAPI
              mediaObj={mediaObj}
              setMediaObj={setMediaObj}
              searchValue={mediaTitle}
              setSearchValue={setMediaTitle}
              placeholder={"Find a media title..."}
            ></SearchAPI>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="absolute right-3 top-4 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>

          <label className="text-base px-2 font-semibold">Entry:</label>

          <Textbox
            initialContent={content}
            setText={setText}
            setContent={setContent}
          ></Textbox>

          <label className="text-base px-2 font-semibold ">Tags:</label>
          <div className="flex items-center justify-between">
            <input
              className="mr-4 mt-1 mb-2 w-full rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
              type="text"
              name="curr-tag"
              placeholder="Add a tag..."
              value={currTag}
              onChange={(e) => setCurrTag(e.target.value)}
              onKeyUp={handleEnter}
              autoComplete="off"
            ></input>
            <button
              className="mb-2 justify-self-end rounded-lg border-b-2 border-solid border-teal-900 bg-teal-600 p-3 text-teal-50 shadow-xl hover:bg-teal-700 active:bg-teal-900 active:shadow-md"
              onClick={addTag}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>

          <div className="h-12 mx-auto mt-3 flex w-full justify-start overflow-x-auto transition duration-300 ease-in-out">
            {tags ? (
              tags.map((t, i) => (
                <Tag title={t} removeTag={removeTag} key={i}></Tag>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className=" mx-auto mb-2 flex w-full max-w-4xl justify-center p-4">
        <button
          onClick={saveEntry}
          className=" focus w-[90%] rounded-lg border-b-4 border-teal-900 border-b-teal-900 bg-teal-600 p-3 text-xl font-semibold  uppercase tracking-widest text-teal-50 shadow-2xl  hover:bg-teal-700 hover:from-teal-600 hover:to-teal-800 active:bg-teal-900 active:shadow-lg"
        >
          save
        </button>
      </div>
    </div>
  );
};

export default EntryForm;
