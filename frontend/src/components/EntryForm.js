import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Textbox from "./Textbox";
import Tag from "./Tag";

const EntryForm = ({ createEntry, journalName }) => {
  const [entryTitle, setEntryTitle] = useState("");
  const [mediaTitle, setMediaTitle] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [currTag, setCurrTag] = useState("");
  const [tags, setTags] = useState(["tag1", "tag2", "longer_tag_for_test"]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  let navigate = useNavigate();
  let location = useLocation();

  const addEntry = async (event) => {
    event.preventDefault();
    console.log({ entryTitle, mediaTitle, date, text, tags });
    createEntry({ entryTitle, mediaTitle, date, text, tags });
    setEntryTitle("");
    setMediaTitle("");
    setDate("");
    setText("");
    setTags([]);
  };

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
        <div className="grid grid-cols-5 p-4 items-center">
          <h1 className=" col-span-4 mx-4">{location.state.journalName}</h1>
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 justify-self-end mr-2 mt-2"
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
            onChange={(e) => setStartDate(e.target.value)}
            type="datetime-local"
            name="start-time"
            value={startDate.toISOString().slice(0, 16)}
          ></input>

          <label className="text-md font-semibold px-2">Media:</label>
          <input
            className="bg-transparent py-2 px-2  mb-2 border-2 border-teal-800 rounded-lg focus:bg-teal-100"
            name="media-title"
          ></input>
        </div>

        <div className="px-4 mx-2 mt-2 text-lg">
          <label className="text-md font-semibold px-2">Entry:</label>

          <Textbox></Textbox>
        </div>

        <div className="flex px-4 mx-2 mt-4 flex-col text-lg text-left">
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
            <button className="justify-self-end p-3 mb-2 rounded-lg bg-teal-600 border-solid shadow-xl hover:bg-teal-700 border-teal-900 active:shadow-md active:bg-teal-900 border-b-2 text-teal-100" onClick={addTag}>
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

        <div className="p-4 mx-2 overflow-x-auto flex">
          {tags ? (
            tags.map((t, i) => (
              <Tag title={t} removeTag={removeTag} key={i}></Tag>
            ))
          ) : (
            <p>Add tags here...</p>
          )}
        </div>

        <div className="fixed bottom-0 w-full flex justify-center p-4 mx-2">
          
          <button className=" bg-gradient-to-tl from-green-400 to-teal-500 rounded-2xl p-2 w-[75%] shadow-2xl border-b-2 hover:to-teal-800 hover:from-teal-600 border-b-teal-900 text-teal-50 font-semibold text-xl tracking-wider uppercase focus">
            create
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;
