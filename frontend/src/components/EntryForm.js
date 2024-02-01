import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Textbox from "./Textbox";
import Tag from "./Tag";
import SearchAPI from "./SearchAPI";

import { EntryContext } from "../contexts/EntryContext";
import { JournalContext } from "../contexts/JournalContext";

import entryService from "../services/entries";
import journalService from "../services/journals";

import { ReactComponent as XIcon } from "../assets/heroicons/x.svg";
import { ReactComponent as PlusIcon } from "../assets/heroicons/plus.svg";
import { ReactComponent as SearchIcon } from "../assets/heroicons/search.svg";
import { ReactComponent as SaveIcon } from "../assets/heroicons/circular-arrows.svg";

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
          entries: currJournal.entries
            .filter((e) => e.id !== currEntry.id)
            .concat(newEntry),
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

  const handleCancel = (e) => {
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

  const setFormatDate = (dateString) => {
    console.log("date str", dateString);
    var currTime = new Date(dateString);
    console.log("curr time", currTime);
    var offset = currTime.getTimezoneOffset() * 60 * 1000;
    const newTime = new Date(currTime - offset);
    console.log("new time", newTime);
    setStartDate(newTime.toISOString());
  };

  return (
    <div className="absolute left-0 top-0 z-20 mx-auto flex h-screen w-full max-w-4xl flex-col justify-between rounded-2xl border-b-8 border-slate-600 bg-teal-50 md:static md:my-8 md:h-auto lg:static ">
      <div className="flex w-full items-center justify-between px-4 py-6">
        <h1 className=" mx-4">{currJournal.journalName}</h1>
        <button
          onClick={(e) => {
            handleCancel(e);
          }}
          className="mr-2 rounded-lg p-1 hover:bg-slate-300 active:bg-slate-400"
        >
          <XIcon className="h-8 w-8 text-teal-900"></XIcon>
        </button>
      </div>
      <div className=" mx-auto flex w-full flex-col justify-start overflow-y-auto text-teal-900">
        <div className="flex w-full items-center px-4 text-gray-500 focus-within:text-gray-700  ">
          <input
            className="mt-2 mb-2 h-14 w-full rounded-lg bg-transparent p-3 text-3xl font-semibold decoration-teal-700 underline-offset-4 focus:underline focus:outline-none "
            autoFocus
            name="title"
            data-cy="input-entry-title"
            placeholder="Untitled"
            autoComplete="off"
            value={entryTitle}
            onChange={(e) => setEntryTitle(e.target.value)}
          ></input>
        </div>

        <div className="mx-2 flex flex-col px-4 text-left text-lg ">
          <label className="px-2 text-base font-semibold">Date:</label>
          <input
            className="mt-1 mb-2 rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
            onChange={(e) => {
              setFormatDate(e.target.value);
            }}
            type="datetime-local"
            name="start-time"
            data-cy="input-entry-date"
            value={startDate.slice(0, 16)}
          ></input>
          <label className="px-2 text-base font-semibold">Media:</label>

          <div className="relative flex text-teal-900">
            <SearchAPI
              data-cy="input-media-component"
              setMediaObj={setMediaObj}
              placeholder={"Find a media title..."}
            ></SearchAPI>
          </div>

          <label className="px-2 text-base font-semibold">Entry:</label>

          <Textbox
            initialContent={content}
            setText={setText}
            setContent={setContent}
          ></Textbox>

          <label className="mb-1 px-2 text-base font-semibold ">Tags:</label>
          <div className="flex items-center justify-between gap-4">
            <input
              className="w-full rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
              type="text"
              name="curr-tag"
              data-cy="input-entry-tag"
              placeholder="Add a tag..."
              value={currTag}
              onChange={(e) => setCurrTag(e.target.value)}
              onKeyUp={handleEnter}
              autoComplete="off"
            ></input>
            <button
              data-cy="add-tag-button"
              className="flex shrink-0 items-center justify-center rounded-lg border-b-2 border-solid border-teal-900 bg-teal-600 p-2 text-teal-50 shadow-xl hover:bg-teal-700 active:bg-teal-900 active:shadow-md"
              onClick={addTag}
            >
              <PlusIcon></PlusIcon>
              <span className="hidden px-2 text-base md:block"> Add Tag</span>
            </button>
          </div>

          <div
            data-cy="tags-div"
            className="mx-auto mt-3 flex h-12 w-full justify-start overflow-x-auto transition duration-300 ease-in-out"
          >
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
      <div className=" mx-auto mb-16 flex w-full max-w-4xl justify-center gap-8 p-4 md:mb-8">
        <button
          id="create-entry-button"
          className="focus flex w-60 items-center justify-center rounded-lg border-2 border-b-2 border-solid border-teal-900 p-2 text-lg font-semibold text-teal-900 shadow-xl hover:bg-slate-300 active:bg-slate-400 active:shadow-md"
          onClick={(e) => handleCancel(e)}
        >
          <XIcon className="hidden h-8 w-8 md:block"></XIcon>
          <span className="px-2">Cancel</span>
        </button>
        <button
          id="create-entry-button"
          data-cy="save-entry-button"
          onClick={saveEntry}
          className="focus flex w-60 items-center justify-center rounded-lg border-b-2 border-solid border-teal-900 bg-teal-600 p-2 text-lg font-semibold text-teal-50 shadow-xl hover:bg-teal-700 active:bg-teal-900 active:shadow-md"
        >
          <SaveIcon className="hidden h-8 w-8 md:block"></SaveIcon>
          <span className="px-2">Save</span>
        </button>
      </div>
    </div>
  );
};

export default EntryForm;
