import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import UserMessageDiv from "@/components/user-message-div";
import AiMessageDiv from "@/components/ai-messasge-div";
import axios from "axios";
import Cookie from "js-cookie";

interface Message {
  role: string;
  message: string;
}

export default function Chat() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [messages,setMessages] = useState<Message[]>([])

  const token = Cookie.get("token");


  const getMessages = async ()=>{
    const response = await axios.get(`http://localhost:8787/api/v1/chat/messages/${year}/${month}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }})
    const messages = response.data
    setMessages(messages)
  }

  useEffect(()=>{
    if(year || month){
      getMessages()
    }
  },[year,month])


  const monthToWords = (monthNumber:any) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[parseInt(monthNumber) - 1];
  };


  const postUserMessage = ()=>{

  }

  return (
    <div className="flex h-screen bg-background">
    <div className="w-[280px] border-r bg-muted/40 p-4 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="month" className="text-sm font-medium">
            Month
          </Label>
          <Select
            value={month}
            onValueChange={(value) => setMonth(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(12)].map((_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {monthToWords(i + 1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="year" className="text-sm font-medium">
            Year
          </Label>
          <Select
            value={year}
            onValueChange={(value) => setYear(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {[2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between border-b bg-background px-6 py-4">
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-muted-foreground" />
          <div className="text-lg font-medium">
            <span className="mr-1">{monthToWords(month)}</span>
            <span>{year}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon">
            <SettingsIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message, index) =>
            message.role === "user" ? (
              <UserMessageDiv
                key={index}
                message={message.message}
                role={message.role}
                avatarFallback="user"
              />
            ) : (
              <AiMessageDiv
                key={index}
                message={message.message}
                role={message.role}
                avatarFallback="AI"
              />
            )
          )}
        </div>
      </div>
      <div className="border-t bg-background p-4">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            className="min-h-[48px] w-full resize-none rounded-2xl border border-neutral-400 px-4 py-2 pr-16 shadow-sm"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 top-3"
            onClick={postUserMessage}
          >
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
}

function CalendarDaysIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

