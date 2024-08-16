import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import toast from "react-hot-toast";
import dayjs from "../../dayjs.config";

import { EntryContext } from "../../contexts/EntryContext";
import { JournalContext } from "../../contexts/JournalContext";

import entryService from "../../services/entries";
import journalService from "../../services/journals";

import { ReactComponent as XIcon } from "../../assets/heroicons/x.svg";
import { ReactComponent as PlusIcon } from "../../assets/heroicons/plus.svg";
import { ReactComponent as SearchIcon } from "../../assets/heroicons/search.svg";
import { ReactComponent as SaveIcon } from "../../assets/heroicons/circular-arrows.svg";
import TextEditor from "./TextEditor";
import Tag from "../shared/Tag";
import SearchAPI from "./SearchAPI";

const increments = {
  Game: ["level(s)", "match(es)"],
  Film: ["episode(s)", "watch(es)", "season(s)"],
  Book: ["page(s)", "chapter(s)"],
  Audio: ["listen(s)", "song(s)", "album(s)"],
  Other: undefined,
};

const EntryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setEntries, currEntry, setCurrEntry } = useContext(EntryContext);
  const { currJournal, setCurrJournal, setJournals } =
    useContext(JournalContext);

  const [entryTitle, setEntryTitle] = useState(currEntry.entryTitle);
  const [mediaObj, setMediaObj] = useState(currEntry.mediaObj);
  const [textAsHTML, setTextAsHTML] = useState(currEntry.text);
  const [text, setText] = useState(currEntry.text);
  const [textCharacterCount, setCharacterCount] = useState(0);
  const [textAsJSON, setTextAsJSON] = useState({});
  const [tags, setTags] = useState(currEntry.tags);
  const [entryDuration, setEntryDuration] = useState(0);
  const [mediaType, setMediaType] = useState("Game");
  const [entryIncrement, setEntryIncrement] = useState(0);
  const [incrementTypes, setIncrementTypes] = useState(increments["Game"]);
  const [incrementType, setIncrementType] = useState("match(es)");
  const [sentiment, setSentiment] = useState("Okay");

  const [startDate, setStartDate] = useState(
    dayjs().local().format("YYYY-MM-DDThh:mm")
  );
  const [currTag, setCurrTag] = useState("");

  const saveEntry = async (event) => {
    event.preventDefault();
    if (entryTitle === "" || textCharacterCount > 1000) {
      return;
    }
    const entryObject = {
      entryTitle,
      mediaObj,
      startDate,
      text,
      textAsJSON,
      textAsHTML,
      tags,
      journalId: currJournal.id,
      entryDuration,
      entryIncrement,
      sentiment,
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

        toast("Entry updated!", { icon: "✏", duration: 4000 });
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

        toast("Entry created!", { icon: "✔", duration: 4000 });
      } catch (e) {
        console.log(e);
      }
    }
    handleCancel();
    // setCurrEntry({
    //   entryTitle: "",
    //   mediaObj: {},
    //   startDate: "",
    //   text: "",
    //   textAsJSON: {},
    //   textAsHTML: "",
    //   tags: [],
    //   journalId: currJournal.id,
    //   entryDuration: 0,
    //   entryIncrement: 0,
    //   sentiment: "",
    // });
    // navigate(-1);
  };

  const printEntry = () => {
    const entryObject = {
      entryTitle,
      mediaObj,
      startDate,
      text,
      textAsJSON,
      textAsHTML,
      tags,
      journalId: currJournal.id,
      entryDuration,
      entryIncrement,
      sentiment,
    };
    console.log(entryObject);
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
      mediaObj: {},
      startDate: "",
      text: "",
      textAsJSON: {},
      textAsHTML: "",
      tags: [],
      journalId: currJournal.id,
      entryDuration: 0,
      entryIncrement: 0,
      sentiment: "",
    });
    navigate(-1);
  };

  const validateDuration = (value) => {
    const [integers, decimals] = value.split(".");
    console.log(integers, decimals);
    if (integers.length < 3 && decimals.length < 3) {
      setEntryDuration(value);
    }
  };

  useEffect(() => {
    console.log("executed");
    setIncrementType(increments[mediaType]);
  }, [mediaType]);

  return (
    <div className="relative z-20 mx-auto flex h-auto max-h-[90%] w-full max-w-4xl flex-col justify-between rounded-2xl border-b-8 border-slate-600 bg-teal-50 md:static md:my-8 md:h-auto lg:static">
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
      <div className="h-full overflow-y-auto pb-64 sm:p-8">
        <div className=" mx-auto flex w-full flex-col justify-start overflow-y-auto text-teal-900">
          <div className="flex w-full items-center px-4 text-gray-500 focus-within:text-gray-700  ">
            <input
              className="mt-2 mb-2 h-14 w-full rounded-lg bg-transparent p-3 text-3xl font-semibold decoration-teal-700 underline-offset-4 focus:underline focus:outline-none "
              autoFocus
              name="title"
              data-cy="input-entry-title"
              placeholder="Add a title..."
              autoComplete="off"
              value={entryTitle}
              onChange={(e) => setEntryTitle(e.target.value)}
            ></input>
          </div>

          <div className="mx-2 flex flex-col px-4 text-left text-lg ">
            <label className="mb-1 px-2 text-base font-semibold">
              Duration:
            </label>
            <div className="flex items-center justify-between">
              <input
                className=" mb-2 w-20 rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
                type="number"
                step={1}
                min={0}
                max={100}
                data-cy="input-entry-increment"
                value={entryIncrement}
                onChange={(e) => setEntryIncrement(e.target.value)}
              ></input>

              <select
                className="mb-2 w-40 rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
                name="incrementTypes"
              >
                {incrementTypes.map((type) => (
                  <option
                    onClick={(e) => setIncrementType(e.target.value)}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
              <span>for</span>
              <input
                className=" mb-2 w-20 rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
                type="number"
                step={0.1}
                min={0}
                max={24}
                data-cy="input-entry-duration"
                value={entryDuration}
                onChange={(e) => setEntryDuration(e.target.value)}
              ></input>
              <span> hour(s) on </span>
              <input
                className=" mb-2 rounded-lg bg-slate-300 p-3 shadow-inner shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                type="datetime-local"
                name="start-time"
                data-cy="input-entry-date"
                value={startDate}
              ></input>
            </div>

            <label className="mb-1 px-2 text-base font-semibold">Media:</label>

            <div className="relative flex text-teal-900">
              <SearchAPI
                data-cy="input-media-component"
                setMediaObj={setMediaObj}
                mediaType={mediaType}
                setMediaType={setMediaType}
                placeholder={"Find a media title..."}
              ></SearchAPI>
            </div>

            <label className="mb-1 px-2 text-base font-semibold">Entry:</label>

            <TextEditor
              setText={setText}
              setTextAsHTML={setTextAsHTML}
              setTextAsJSON={setTextAsJSON}
              setTextCharacterCount={setCharacterCount}
            ></TextEditor>

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

            <label className="mb-1 px-2 text-base font-semibold">
              Sentiment:
            </label>

            <div className="mt-1 mb-2 flex w-full justify-between transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700">
              <button
                onClick={() => setSentiment("Awful")}
                className="h-16 w-32 rounded-md bg-teal-200"
              >
                😟 Awful
              </button>
              <button
                onClick={() => setSentiment("Bad")}
                className="h-16 w-32 rounded-md bg-teal-200"
              >
                😕 Bad
              </button>
              <button
                onClick={() => setSentiment("Okay")}
                className="h-16 w-32 rounded-md bg-teal-200"
              >
                😐 Okay
              </button>
              <button
                onClick={() => setSentiment("Good")}
                className="h-16 w-32 rounded-md bg-teal-200"
              >
                🙂 Good
              </button>
              <button
                onClick={() => setSentiment("Great")}
                className="h-16 w-32 rounded-md bg-teal-200"
              >
                😀 Great
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 mx-auto flex w-full max-w-4xl justify-center gap-8 bg-teal-50 p-4 pt-8 pb-16 md:static ">
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
          onClick={(e) => saveEntry(e)}
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
