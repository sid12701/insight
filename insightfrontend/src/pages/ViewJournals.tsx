import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { truncateTo10Words } from "@/lib/utils";

export default function viewjournals() {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString() // +1 to match 1-12 range
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [journals, setJournals] = useState<any[]>([]);

  const token = Cookie.get("token");

  const fetchJournals = async (month: string, year: string) => {
    const monthJournals = await axios.get(
      `http://localhost:8787/api/v1/journal/month/${year}/${month}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const journalArray = monthJournals.data.journals;
    setJournals(journalArray);
  };

  useEffect(() => {
    fetchJournals(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const years = Array.from({ length: 10 }, (_, i) =>
    (new Date().getFullYear() - 5 + i).toString()
  );

  const formatDate = (dateString:string)=> {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    }
  
    return `${day}${suffix} ${month} ${year}`;
  }
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Journal Entries</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {journals.map((journal) => (
          <Card key={journal.id}>
            <CardHeader>
              <CardTitle>{journal.title}</CardTitle>
              <CardDescription>{formatDate(journal.date)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{truncateTo10Words(journal.journal)}</p>
              <p>{truncateTo10Words(journal.insight)}</p>
            </CardContent>
            <CardFooter>
              <Link
                to={`/viewjournal/${journal.id}`}
                className="font-sans font-normal text-blue-700 text-xs dark:text-blue-400 hover:underline pt-5"
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
