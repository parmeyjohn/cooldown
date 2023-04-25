import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Textbox from "./Textbox";
import Tag from "./Tag";
import SearchAPI from "./SearchAPI";

import { EntryContext } from "../contexts/EntryContext";
import { JournalContext } from "../contexts/JournalContext";

import entryService from "../services/entries";
import journalService from "../services/journals";
import gamesService from "../services/games";

import axios from "axios";

const EntryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { entries, setEntries, currEntry, setCurrEntry } =
    useContext(EntryContext);
  const { currJournal, setCurrJournal, journals, setJournals } =
    useContext(JournalContext);

  const [entryTitle, setEntryTitle] = useState(currEntry.entryTitle);
  const [mediaTitle, setMediaTitle] = useState(currEntry.mediaTitle);
  const [mediaObj, setMediaObj] = useState(currEntry.mediaObj)
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
        setEntries((prevEntries) => prevEntries.concat(newEntry));
        setCurrJournal((prevJournal) => newJournal);
        setJournals((prevJournals) =>
          prevJournals.map((j) => {
            if (j.id === newJournal.id) {
              return newJournal;
            } else {
              return j;
            }
          })
        );

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
      startDate: ''
    })
    navigate(-1);
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag, i) => tag !== tagToRemove));
  };

  const addTag = () => {
    if (currTag.length > 1) {
      setTags(prevTag => [currTag].concat(tags));
      setCurrTag(prevCurrTag => "");
    }
  };

  const handleEnter = (e) => {
    console.log(currTag)
    console.log(tags)
    console.log(currEntry)
    if (e.key === "Enter") {
      addTag();
    }
  };

  const setFormatDate = (dateString) => {
    var currTime = new Date();
    var offset = currTime.getTimezoneOffset() * 60 * 1000;
    const newTime = new Date(currTime - offset);
    setStartDate(newTime);
    return newTime;
  };

  return (
    <div className="h-screen w-screen overflow-y-auto bg-gradient-to-b from-teal-50 to-teal-100">
      <div className="flex flex-col justify-between  max-w-4xl mx-auto  text-teal-900 w-full h-full z-20">
        <div className="flex justify-between items-center  px-4 py-6 w-full">
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
                startDate: ''
              })
              navigate(-1);
            }}
            className="w-8 h-8 justify-self-end mr-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className=""
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex px-4 w-full items-center text-gray-500 focus-within:text-gray-700  ">
          <input
            className="w-full p-3 mt-2 mb-2 rounded-lg bg-transparent focus:outline-none h-14 text-3xl font-semibold focus:underline underline-offset-4 decoration-teal-700 "
            autoFocus
            name="title"
            placeholder="Untitled"
            autoComplete="off"
            value={entryTitle}
            onChange={(e) => setEntryTitle(e.target.value)}
          ></input>
        </div>

        <div className="flex px-4 mx-2 flex-col text-lg text-left">
          <label className="text-md font-semibold px-2">Date:</label>
          <input
            className="bg-slate-300 mt-1 shadow-inner shadow-slate-400 rounded-lg p-3 mb-2 outline-8 focus:outline-offset-1 focus:outline-teal-700 focus:bg-teal-50 focus:shadow-none transition ease-in-out duration-300"
            onChange={(e) => {
              setFormatDate(e.target.value);
            }}
            type="datetime-local"
            name="start-time"
            value={startDate.slice(0, 16)}
          ></input>

          <SearchAPI mediaObj={mediaObj} setMediaObj={setMediaObj} searchValue={mediaTitle} setSearchValue={setMediaTitle} placeholder={'Find a media title...'}></SearchAPI>
          
          <label className="text-md font-semibold px-2">Entry:</label>

          <Textbox
            initialContent={content}
            setText={setText}
            setContent={setContent}
          ></Textbox>
        
        <label className="text-md font-semibold px-2 mt-2 ">Tags:</label>
          <div className="flex justify-between items-center mt-1">
            <input
              className="w-full mr-4 bg-slate-300 shadow-inner shadow-slate-400 rounded-lg p-3 mb-2 outline-8 focus:outline-offset-1 focus:outline-teal-700 focus:bg-teal-50 focus:shadow-none transition ease-in-out duration-300"
              type="text"
              name="curr-tag"
              placeholder="Add a tag..."
              value={currTag}
              onChange={(e) => setCurrTag(e.target.value)}
              onKeyUp={handleEnter}
              autoComplete="off"
            ></input>
            <button
              className="justify-self-end p-3 mb-2 rounded-lg bg-teal-600 border-solid shadow-xl hover:bg-teal-700 border-teal-900 active:shadow-md active:bg-teal-900 border-b-2 text-teal-50"
              onClick={addTag}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        
        </div>
        
        <div className=" mx-auto w-[90%] overflow-x-auto flex justify-start mt-3 transition ease-in-out duration-300">
          {tags ? (
            tags.map((t, i) => (
              <Tag title={t} removeTag={removeTag} key={i}></Tag>
            ))
          ) : (
            <></>
          )}
        </div>

        <div className=" mb-5 w-full max-w-4xl flex justify-center p-4 mx-auto">
          <button
            onClick={saveEntry}
            className=" bg-teal-600 rounded-lg p-3 w-[90%] shadow-2xl border-b-4 hover:to-teal-800 hover:from-teal-600 border-b-teal-900 text-teal-50  hover:bg-teal-700 border-teal-900 active:shadow-lg active:bg-teal-900  font-semibold text-xl tracking-widest uppercase focus"
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;
