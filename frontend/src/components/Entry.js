import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import OptionsButton from "./OptionsButton";
import Tag from "./shared/Tag";

import { EntryContext } from "../contexts/EntryContext";
import { JournalContext } from "../contexts/JournalContext";

import entryService from "../services/entries";
import journalService from "../services/journals";
import toast from "react-hot-toast";

const Entry = ({ entry, setSearchVal }) => {
  const [showFullEntry, setShowFullEntry] = useState(false);
  const { setEntries, setCurrEntry } = useContext(EntryContext);
  const { currJournal, setJournals } = useContext(JournalContext);

  let navigate = useNavigate();
  var img_url = "";

  if (entry?.mediaObj && entry.mediaObj?.img) {
    img_url = entry.mediaObj.img;
  } else if (entry?.mediaObj && entry.mediaObj?.sample_cover) {
    img_url = entry.mediaObj.sample_cover.image;
  }

  const handleDelete = () => {
    console.log("in handleDelete: entry", entry);
    entryService.remove(entry.id);
    toast("Entry successfully deleted", { icon: "🗑", duration: 4000 });
    //remove locally too
    setEntries((prevEntries) => prevEntries.filter((e) => e.id !== entry.id));
    setJournals((prevJournals) => {
      var newJournals = [...prevJournals];
      let journalIndex = newJournals.findIndex(
        (x) => x.journalName === currJournal.journalName
      );
      newJournals[journalIndex].entries = newJournals[
        journalIndex
      ].entries.filter((e) => e !== entry);
      return newJournals;
    });
    journalService.update(entry.journalId, { $pull: { entries: entry.id } });
  };

  const handleEdit = (event) => {
    setCurrEntry(entry);
    navigate("edit", {
      state: {
        edit: true,
      },
    });
  };

  const formatTime = (datetimeString) => {
    var time = datetimeString.slice(11, 16);
    var hrs = Number(time.slice(0, 2));
    var zone = "";
    if (hrs === 0) {
      hrs = 12;
      zone = "AM";
    } else if (hrs > 11) {
      hrs -= 12;
      zone = "PM";
    } else {
      zone = "AM";
    }
    const mins = time.slice(3, 5);
    return ` ${hrs}:${mins} ${zone}`;
  };

  return (
    <>
      {showFullEntry ? (
        <div
          onClick={() => setShowFullEntry(!showFullEntry)}
          className=" mx-2 h-auto cursor-pointer border-b-2 bg-teal-50 p-5 px-6 transition-colors duration-300 ease-in-out first:rounded-t-xl last:rounded-b-xl last:border-b-4 last:border-b-slate-400  last:shadow-xl hover:bg-slate-300 active:bg-slate-400"
          data-cy="entry"
        >
          <div>
            <div className="relative flex w-full flex-col items-start justify-start sm:flex-row">
              <div className="-order-1 mb-2 flex h-40 w-full items-center justify-center py-2 sm:w-40">
                {"mediaObj" in entry ? (
                  <img
                    className="h-full w-full rounded-md border-2 border-slate-800 object-cover object-center"
                    src={img_url}
                    alt={`${entry.mediaObj.title} cover`}
                  ></img>
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-slate-800 bg-slate-300 text-slate-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-10 w-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="-order-1 flex h-full w-full flex-col items-start justify-between sm:ml-3">
                <div className=" flex w-full justify-between sm:px-2">
                  <h2 className="w-auto max-w-[90%] text-xl font-semibold sm:truncate">
                    {entry.entryTitle !== "" ? entry.entryTitle : "Untitled"}
                  </h2>
                  <OptionsButton
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  ></OptionsButton>
                </div>

                <p className="ml-2 py-2 text-left leading-relaxed">
                  {entry.text}
                </p>
              </div>
            </div>
            <div className="flex w-full items-end justify-between">
              <div className="ml-4 mt-4 flex overflow-x-auto">
                {entry.tags.map((t, i) => (
                  <Tag title={t} key={i} handleClick={setSearchVal}></Tag>
                ))}
              </div>
              <div className="text-md ml-5 whitespace-nowrap">
                {entry.startDate ? `${formatTime(entry.startDate)}` : "no date"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setShowFullEntry(!showFullEntry)}
          className="h-26 mx-2 cursor-pointer border-b-2 bg-teal-50 p-5 px-6 first:rounded-t-xl last:rounded-b-xl last:border-b-4 last:border-b-slate-400  last:shadow-xl hover:bg-slate-300 active:bg-slate-400"
        >
          <div>
            <div className="relative flex w-full items-start justify-start">
              <div className="h-20 w-20 overflow-clip rounded-md border-2 border-slate-800">
                {"mediaObj" in entry ? (
                  <img
                    className="h-full w-full object-cover"
                    src={img_url}
                    alt={`${entry.mediaObj.title} cover`}
                  ></img>
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-md border-2 border-slate-800 bg-slate-300 text-slate-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-10 w-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex h-full w-full justify-between">
                <div className="ml-2 px-2">
                  <h2 className="w-40 truncate text-lg font-semibold xxs:w-60 sm:w-80 sm:text-xl lg:w-full">
                    {entry.entryTitle}
                  </h2>

                  <p className="p-2 text-left leading-relaxed line-clamp-2">
                    {entry.text}
                  </p>
                </div>

                <OptionsButton
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                ></OptionsButton>
              </div>
            </div>
            <div className="flex w-full items-end justify-between">
              <div className="ml-4 mt-2 flex overflow-x-auto">
                {entry.tags.map((t, i) => (
                  <Tag title={t} key={i} handleClick={setSearchVal}></Tag>
                ))}
              </div>
              <div className="text-md ml-5 whitespace-nowrap">
                {entry.startDate ? `${formatTime(entry.startDate)}` : "no date"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Entry;
