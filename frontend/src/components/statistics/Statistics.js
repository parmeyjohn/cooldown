import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import statsService from "../../services/statistics";

import { JournalContext } from "../../contexts/JournalContext";
import { EntryContext } from "../../contexts/EntryContext";
import { UserContext } from "../../contexts/UserContext";
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
    <div className="relative z-20 mx-auto flex h-[90%] w-full max-w-4xl flex-col justify-start  rounded-2xl border-b-8 border-slate-600 bg-teal-50 p-8 md:static">
      <div className="h-full overflow-y-auto">
        <h2 className="pb-2 text-xl font-semibold">
          Your favorite types of media:
        </h2>
        <div className="flex w-full justify-around gap-4 rounded-xl bg-slate-200 p-4 text-teal-800">
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
              incrementName={"avg rating"}
              data={data.sortedMediaTypeBySentiment}
              subtitle={"By Sentiment"}
            ></StatCard>
          )}
        </div>
        <h2 className="py-2 text-xl font-semibold">
          Your most popular titles:
        </h2>
        <div className="flex w-full flex-col flex-wrap justify-around gap-2 rounded-xl bg-slate-200 p-4 text-teal-700 xl:flex-row">
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
