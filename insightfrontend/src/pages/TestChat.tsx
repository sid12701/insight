"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import axios from "axios"
import Cookie from 'js-cookie'

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export default function Component() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [messages, setMessages] = useState<string[]>([])
  const [currentMessage, setCurrentMessage] = useState("")


  const token = Cookie.get('token')

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
    } else {
      setSelectedMonth(selectedMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
    } else {
      setSelectedMonth(selectedMonth + 1)
    }
  }

  const handleAddMessage = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, currentMessage])
      setCurrentMessage("")
    }
  }
  const getMessages = async (year,month)=>{
    const response = await axios.get(`http://localhost:8787/api/v1/chat/messages/${year}/${month}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }})
    const messages = response.data
    console.log(messages)
    setMessages(messages)
  }
  useEffect(()=>{
    if(selectedMonth || selectedYear){
      getMessages(selectedYear,selectedMonth);
      console.log
    }
  },[selectedMonth,selectedYear])
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Column - Month and Year Selection */}
      <div className="w-full md:w-1/4 p-4 bg-background border-b md:border-b-0 md:border-r overflow-y-auto">
        <div className="sticky top-0 bg-background pt-4">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Select Date</h2>
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-base md:text-lg font-semibold">
              {months[selectedMonth]} {selectedYear}
            </span>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Right Column - Messages and Input */}
      <div className="w-full md:w-3/4 p-4 flex flex-col overflow-hidden">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Messages</h2>
        {/* <ScrollArea className="flex-grow mb-4">
          {messages.map((message, index) => (
            <div key={index} className="mb-2 p-2 bg-muted rounded">
              {message}
            </div>
          ))}
        </ScrollArea> */}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <Button onClick={handleAddMessage}>Send</Button>
        </div>
      </div>
    </div>
  )
}