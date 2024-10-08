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
      ` https://insightbackend.siddhantdaryanani.workers.dev/api/v1/journal/${id}`,
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
    if (!insight) return null;

    const removeAsterisks = (text: string) => text.replace(/\*\*/g, '');

    const lines = insight.split('• ');
    return lines.map((line, index) => {
      if (index === 0) return <p key={index} className="mb-2">{removeAsterisks(line.trim())}</p>;
      return (
        <div key={index} className="mb-2">
          <span className="mr-2">•</span>
          {removeAsterisks(line.trim()).split('\n').map((subLine, subIndex) => (
            <React.Fragment key={`${index}-${subIndex}`}>
              {subLine}
              {subIndex < removeAsterisks(line.trim()).split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      );
    });
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
      <div className="text-gray-600 dark:text-white">
        {formatInsight(journal.insight!)}
      </div>
    </div>
  );
};

export default SingleJournal;