import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import statsService from "../../services/statistics";

import { JournalContext } from "../../contexts/JournalContext";
import { EntryContext } from "../../contexts/EntryContext";
import { UserContext } from "../../contexts/UserContext";

import { ReactComponent as XIcon } from "../../assets/heroicons/x.svg";

import StatCard from "./StatCard";

const Statistics = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setEntries, currEntry, setCurrEntry } = useContext(EntryContext);
  const { currJournal, setCurrJournal, setJournals } =
    useContext(JournalContext);

  const { user, setUser } = useContext(UserContext);

  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      statsService.setToken(user.token);
      console.log(user);
      const stats = await statsService.getAll();
      console.log(stats);
      return stats;
    },
    queryKey: [],
    placeholderData: [],
    enabled: true,
  });

  return (
    <div className="relative z-20 mx-auto my-4 flex h-[90%] w-full max-w-4xl flex-col justify-start rounded-2xl bg-teal-50 pb-8 md:static">
      <div className="flex items-center justify-between px-8 pt-8">
        <h2 className="text-2xl font-bold">Stats</h2>
        <button
          onClick={(e) => navigate(-1)}
          className="mr-2 rounded-lg p-1 hover:bg-slate-300 active:bg-slate-400"
        >
          <XIcon className="h-8 w-8 text-teal-900"></XIcon>
        </button>
      </div>
      <div className="h-full overflow-y-auto px-8">
        <h3 className="sticky top-0 bg-teal-50 py-2 pl-2 text-xl font-semibold text-slate-600">
          Your favorite types of media:
        </h3>
        <div className="flex h-auto w-full flex-col justify-around gap-4 rounded-xl bg-slate-200 p-4 text-teal-800 md:flex-row">
          {data.sortedMediaTypeByDuration && (
            <StatCard
              incrementName={"hrs"}
              data={data.sortedMediaTypeByDuration}
              subtitle={"By Duration"}
            ></StatCard>
          )}
          {data.sortedMediaTypeByEntries && (
            <StatCard
              incrementName={"entries"}
              data={data.sortedMediaTypeByEntries}
              subtitle={"By Number of Entries"}
            ></StatCard>
          )}
          {data.sortedMediaTypeBySentiment && (
            <StatCard
              incrementName={"avg"}
              data={data.sortedMediaTypeBySentiment}
              subtitle={"By Sentiment"}
            ></StatCard>
          )}
        </div>
        <h3 className="sticky top-0 bg-teal-50 pt-2 pl-2 text-xl font-semibold text-slate-600">
          Your most popular titles:
        </h3>
        <h4 className="sticky top-8 bg-teal-50 py-2 pl-4 font-medium text-slate-500">
          By Sentiment:
        </h4>
        <div className="flex h-auto w-full shrink-0 flex-col flex-wrap justify-around gap-2 rounded-xl bg-slate-200 p-4 text-teal-700 xl:flex-row">
          {data.sortedDurationPerTitle && (
            <StatCard
              incrementName={"hrs"}
              data={data.sortedDurationPerTitle[0]}
              subtitle={"Games"}
            ></StatCard>
          )}
          {data.sortedDurationPerTitle && (
            <StatCard
              incrementName={"hrs"}
              data={data.sortedDurationPerTitle[1]}
              subtitle={"Movies/Shows"}
            ></StatCard>
          )}
          {data.sortedDurationPerTitle && (
            <StatCard
              incrementName={"hrs"}
              data={data.sortedDurationPerTitle[2]}
              subtitle={"Books"}
            ></StatCard>
          )}
          {data.sortedDurationPerTitle && (
            <StatCard
              incrementName={"hrs"}
              data={data.sortedDurationPerTitle[3]}
              subtitle={"Music/Podcasts"}
            ></StatCard>
          )}
          {data.sortedDurationAllTitles && (
            <StatCard
              incrementName={"hrs"}
              data={data.sortedDurationAllTitles}
              subtitle={"Overall"}
            ></StatCard>
          )}
        </div>
        <h4 className="sticky top-8 bg-teal-50 py-2 pl-4 font-medium text-slate-600">
          By Average Rating
        </h4>
        <div className="flex w-full flex-col flex-wrap justify-around gap-2 rounded-xl bg-slate-200 p-4 text-teal-700 xl:flex-row">
          {data.sortedSentimentPerTitle && (
            <StatCard
              incrementName={"avg"}
              data={data.sortedSentimentPerTitle[0]}
              subtitle={"Games"}
            ></StatCard>
          )}
          {data.sortedSentimentPerTitle && (
            <StatCard
              incrementName={"avg"}
              data={data.sortedSentimentPerTitle[1]}
              subtitle={"Movies/Shows"}
            ></StatCard>
          )}
          {data.sortedSentimentPerTitle && (
            <StatCard
              incrementName={"avg"}
              data={data.sortedSentimentPerTitle[2]}
              subtitle={"Books"}
            ></StatCard>
          )}
          {data.sortedSentimentPerTitle && (
            <StatCard
              incrementName={"avg"}
              data={data.sortedSentimentPerTitle[3]}
              subtitle={"Music/Podcasts"}
            ></StatCard>
          )}
          {data.sortedSentimentAllTitles && (
            <StatCard
              incrementName={"avg"}
              data={data.sortedSentimentAllTitles}
              subtitle={"Overall"}
            ></StatCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
