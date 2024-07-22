// import React, { useState } from "react";
// import {
//   buttonDisabledState,
//   dateState,
//   journalState,
//   loadingState,
//   modalState
// } from "@/atoms";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon } from "@radix-ui/react-icons";
// import { useRecoilState } from "recoil";
// import { format } from "date-fns";

// const Journal: React.FC = () => {
//   //   const [date, setDate] = useRecoilState(dateState);
//   const [date, setDate] = useState<Date>();
//   const [journal, setJournal] = useRecoilState(journalState);
//   const [loadState, setLoadState] = useRecoilState(loadingState);
//   const [buttonState, setButtonState] = useRecoilState(buttonDisabledState);

//   const handleDateSelect = (selectedDate: Date | undefined) => {
//     setDate(selectedDate);
//   };

//   return (
//     <div className="mx-auto max-w-2xl space-y-6 py-12">
//       <div className="space-y-2">
//         <h1 className="text-3xl font-bold">Journal Entry</h1>
//         <p className="text-gray-500 dark:text-gray-400">
//           Record your thoughts and reflections.
//         </p>
//       </div>
//       <div className="space-y-4">
//         {/* <div className="grid grid-cols-2 items-center gap-4"> */}
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="w-full text-left flex justify-between items-center"
//               >
//                 <span>{date ? format(date, "PPP") : "Pick a date"}</span>
//                 <CalendarIcon className="ml-2" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0">
//               <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={setDate}
//                 className="rounded-md border"
//               />
//             </PopoverContent>
//           </Popover>
//         {/* </div> */}
//         <label
//           htmlFor="title"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Title
//         </label>
//         <Input
//           id="title"
//           placeholder="Title"
//           type="text"
//           value={journal.title}
//           onChange={(e) => setJournal({ ...journal, title: e.target.value })}
//         />
//         <label
//           htmlFor="journal"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Journal
//         </label>
//         <Textarea
//           className="min-h-[200px]"
//           id="journal"
//           placeholder="Write your journal entry..."
//           value={journal.journal}
//           onChange={(e) => setJournal({ ...journal, journal: e.target.value })}
//         />
//         <label
//           htmlFor="insight"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Insights
//         </label>
//         <Textarea
//           className="min-h-[100px]"
//           id="insights"
//           placeholder="Record your insights..."
//           value={journal.insight}
//           onChange={(e) => setJournal({ ...journal, insight: e.target.value })}
//         />
//         <div className="flex justify-between">
//           <Button type="submit" disabled={buttonState || loadState}>
//             {loadState ? "Journaling..." : "Journal it"}
//           </Button>
//           <Button variant="outline">Generate AI Insights</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Journal;


/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZmU8AuLYhfR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DayPicker } from "react-day-picker";
import {useState} from 'react'
import { format } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";

export default function Component() {
    const [date,setDate] = useState<Date>()
  return (
<DatePicker />
  
)
}
