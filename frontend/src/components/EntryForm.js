import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Textbox from "./Textbox";
import Tag from "./Tag";

import { EntryContext } from "../contexts/EntryContext";

import entryService from "../services/entries";
import journalService from "../services/journals";

import axios from 'axios'

const EntryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {entries, setEntries, currEntry, setCurrEntry} = useContext(EntryContext)
  
   
  const [entryTitle, setEntryTitle] = useState(currEntry.entryTitle);
  const [mediaTitle, setMediaTitle] = useState(currEntry.mediaTitle);
  const [text, setText] = useState(currEntry.text);
  const [content, setContent] = useState(currEntry.content)
  const [tags, setTags] = useState(currEntry.tags);
  const [startDate, setStartDate] = useState(currEntry.startDate);
  const [currTag, setCurrTag] = useState("");
  

  useEffect(() => {
    console.log(currEntry)
    console.log(entries)
  },[])
  const getGames = async (e) => {
    let config = {
      headers: 
      {
        'Access-Control-Allow-Origin': '*'
      }
    }
    const res = await axios.get('https://api.mobygames.com/v1/games?api_key=moby_Tk4r7bCXPkojxrTHEKnmYYkM72N', config)
    console.log(res)
  }

  const saveEntry = async (event) => {
    event.preventDefault();
    const entryObject = {
      entryTitle,
      mediaTitle,
      startDate,
      text,
      content,
      tags,
      journalId: location.state.journal.id
    };
    if (location.state.edit) {
      //edit
      const newEntry = await entryService.update(currEntry.id, entryObject)
      setEntries(entries.filter((e) => e !== currEntry).concat(newEntry))
      alert('entry updated')
    } else {
      //add the entry
      const newEntry = await entryService.create(entryObject)
      journalService.update(location.state.journal.id, {$push: {entries: newEntry.id}})
      setEntries(entries.concat(newEntry))
      alert('entry created')
    }

    navigate(-1);
    
  }
  
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag, i) => tag !== tagToRemove));
  };

  const addTag = () => {
    if (currTag.length > 0) {
      setTags([currTag].concat(tags));
      setCurrTag("");
    }
    
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addTag();
    }
  };

  return (
    <div className="h-screen w-screen overflow-y-auto">
      <div className="flex flex-col bg-gradient-to-b from-teal-50 to-teal-100 text-teal-900 w-full h-full z-20 absolute">
        <div className="flex justify-between items-center px-4 py-6 w-full">
          <h1 className=" mx-4 h-8">{location.state.journal.journalName}</h1>
          <button
            onClick={() => navigate(-1)}
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
            className="w-full p-2 mx-2 mt-2 mb-4 rounded-lg bg-transparent focus:outline-none h-14 text-3xl font-semibold underline underline-offset-[40%] decoration-teal-800 decoration-4"
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
            className="bg-transparent py-2 px-2  mb-2 border-2 border-teal-800 rounded-lg focus:bg-teal-100"
            onChange={(e) => {console.log(startDate);setStartDate(e.target.value); console.log(e.target.value)}}
            type="datetime-local"
            name="start-time"
            value={startDate}
          ></input>
          <label className="text-md font-semibold px-2">Media:</label>
          <input
            className="bg-transparent py-2 px-2 border-2 border-teal-800 rounded-lg focus:bg-teal-100"
            name="media-title"
            onChange={(e) => setMediaTitle(e.target.value)}
            value={mediaTitle}
          ></input>
        </div>
      
        <div className="px-4 mx-2 mt-2 text-lg">
          <label className="text-md font-semibold px-2">Entry:</label>

          <Textbox initialContent={content} setText={setText} setContent={setContent}></Textbox>
        </div>

        <div className="flex px-4 mx-2 mt-2 flex-col text-lg text-left">
          <label className="text-md font-semibold px-2">Tags:</label>
          <div className="grid grid-cols-6 ">
            <input
              className="bg-transparent py-2 px-2 mb-2 col-span-5 border-2 border-teal-800 rounded-lg focus:bg-teal-100"
              type="text"
              name="curr-tag"
              placeholder="Add a tag..."
              value={currTag}
              onChange={(e) => setCurrTag(e.target.value)}
              onKeyDown={handleEnter}
            ></input>
            <button className="justify-self-end p-3 mb-2 rounded-lg bg-teal-600 border-solid shadow-xl hover:bg-teal-700 border-teal-900 active:shadow-md active:bg-teal-900 border-b-2 text-teal-50" onClick={addTag}>
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

        <div className=" mx-auto w-[90%] overflow-x-auto flex justify-start mt-3">
          {tags ? (
            tags.map((t, i) => (
              <Tag title={t} removeTag={removeTag} key={i}></Tag>
            ))
          ) : (
            <p>Add tags here...</p>
          )}
        </div>

        <div className="fixed bottom-0 w-full flex justify-center p-4 mx-auto">
          
          <button onClick={saveEntry} className=" bg-teal-600 rounded-lg p-2 w-[90%] shadow-2xl border-b-4 hover:to-teal-800 hover:from-teal-600 border-b-teal-900 text-teal-50  hover:bg-teal-700 border-teal-900 active:shadow-lg active:bg-teal-900  font-semibold text-xl tracking-widest uppercase focus">
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;
