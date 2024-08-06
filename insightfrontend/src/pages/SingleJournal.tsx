import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookie from "js-cookie";
import dayjs from "dayjs";
import React from "react";

interface Journal {
  id?: string;
  title?: string;
  journal?: string;
  date?: string;
  insight?: string;
}

const SingleJournal = () => {
  const token = Cookie.get("token");
  const [journal, setJournal] = useState<Journal>({});
  const { id } = useParams();
  const getJournalById = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8787/api/v1/journal/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setJournal(response.data.journal);
  };
  useEffect(() => {
    getJournalById();
  }, []);

  const formatInsight = (insight: string) => {
    const formattedInsight = insight.split("\n").map((line, index) => {
      line = line.replace(/\*\*/g, "");

      if (line.startsWith("•")) {
        return (
          <React.Fragment key={index}>
            <br />
            <span className="flex">
              <span className="mr-2">•</span>
              <span>{line.slice(1).trim()}</span>
            </span>
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      );
    });

    return formattedInsight;
  };
  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-semibold text-center mb-4">
        {dayjs(journal.date).format("MMM D, YYYY")}
      </h1>
      <h2 className="text-xl font-semibold mb-2 dark:text-white">
        {journal.title}
      </h2>
      <p className="text-base text-gray-700 mb-3 dark:text-white">
        {journal.journal}
      </p>
      <p className="text-gray-600 dark:text-white">
        {formatInsight(journal.insight!)}
      </p>
    </div>
  );
};

export default SingleJournal;
