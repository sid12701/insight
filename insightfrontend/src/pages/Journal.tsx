  import React from "react";
  import {
    buttonDisabledState,
    dateState,
    journalState,
    loadingState,
    aiInsight,
  } from "@/atoms";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
  } from "@/components/ui/popover";
  import { Calendar } from "@/components/ui/calendar";
  import { CalendarIcon } from "@radix-ui/react-icons";
  import { useRecoilState } from "recoil";
  import { format, formatISO } from "date-fns";
  import axios from "axios";
  import { CardTitle } from "@/components/ui/card";
  import { Card, CardHeader, CardContent } from "../components/ui/card";
  import Cookie from 'js-cookie';

  const Journal: React.FC = () => {
    const [date, setDate] = useRecoilState(dateState);
    // const [date, setDate] = useState<Date>();
    const [journal, setJournal] = useRecoilState(journalState);
    const [loadState, setLoadState] = useRecoilState(loadingState);
    const [buttonState, setButtonState] = useRecoilState(buttonDisabledState);
    const [aiState, setAiState] = useRecoilState(aiInsight);
    // const handleDateSelect = (selectedDate: Date | undefined) => {
    //   setDate(selectedDate);
    // };

    const token = Cookie.get('token')

    const generateAiInsight = async () => {
      const newJournal = {
        journal: journal.journal,
      };
      try{
        setLoadState(true)
        setButtonState(true)
      const response = await axios.post(
        "http://127.0.0.1:8787/api/v1/journal/ai",
        newJournal, {
          headers: {
            Authorization: `Bearer ${token}`,
          }});
      const insight = response.data.insights.response;
      setJournal((prevJournal) => ({
        ...prevJournal,
        insight: insight,
      }));
      setAiState(true);}
      catch(e){
        return "Error Generating Insights"
      }
      finally{
        setLoadState(false)
        setButtonState(false)
      }
    };

    const postJournal = async () => {
      const journalEntry = {
        title: journal.title,
        journal: journal.journal,
        insight: journal.insight,
        // date: date ? format(date, "yyyy-MM-dd") : null,
        date: formatISO(date)
      };
      console.log(journalEntry)
      try{
        setLoadState(true);
        setButtonState(true);
        const response = await axios.post('http://127.0.0.1:8787/api/v1/journal',journalEntry,{
          headers: {
            Authorization: `Bearer ${token}`,
          }});
        console.log(response)
      }
      catch(e){
        console.log(e)
      }
      finally{
        setButtonState(false)
        setLoadState(false)
      }
    };

    const formatInsight = (insight: string) => {
      const formattedInsight = insight.split('\n').map((line, index) => {
        line = line.replace(/\*\*/g, '');
        
        if (line.startsWith('•')) {
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
        return <React.Fragment key={index}>{line}<br /></React.Fragment>;
      });

      return formattedInsight;
    };

    return (
      <div className="mx-auto max-w-2xl space-y-6 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Journal Entry</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Record your thoughts and reflections.
          </p>
        </div>
        <div className="space-y-4">
          {/* <div className="grid grid-cols-2 items-center gap-4"> */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-left flex justify-between items-center"
              >
                <span>{date ? format(date, "PPP") : "Pick a date"}</span>
                <CalendarIcon className="ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                required
              />
            </PopoverContent>
          </Popover>
          {/* </div> */}
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Title
          </label>
          <Input
            id="title"
            placeholder="Title"
            type="text"
            value={journal.title}
            onChange={(e) => setJournal({ ...journal, title: e.target.value })}
          />
          <label
            htmlFor="journal"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Journal
          </label>
          <Textarea
            className="min-h-[200px]"
            id="journal"
            placeholder="Write your journal entry..."
            value={journal.journal}
            onChange={(e) => setJournal({ ...journal, journal: e.target.value })}
          />
          <label
            htmlFor="insight"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Insights
          </label>
          { aiState ?  <Card className="mt-4">
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300">{formatInsight(journal.insight)}</p>
              </CardContent>
            </Card>: 
            <Textarea
              className="min-h-[100px]"
              id="insights"
              placeholder="Record your insights..."
              value={journal.insight}
              onChange={(e) =>
                setJournal({ ...journal, insight: e.target.value })
              }
            />
          }
          <div className="flex justify-between">
            <Button type="submit" disabled={buttonState || loadState} onClick={postJournal}>
              {loadState ? "Journaling..." : "Journal it"}
            </Button>
            <Button variant="outline" onClick={generateAiInsight} disabled={buttonState || loadState}>
            {loadState ? "Generating Insights..." : "Generate Insights" }
            </Button>
          </div>
        </div>
      </div>
    );
  };

  export default Journal;
