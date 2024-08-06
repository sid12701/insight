import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(dateStr : string) {
  const date = new Date(dateStr);

  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  function getOrdinalIndicator(day:number) :string {
    if (day > 3 && day < 21) return 'th'; 
    switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }

  return `${day}${getOrdinalIndicator(day)} ${month} ${year}`;
}




export function  truncateTo10Words (text: string)  {
  const words = text.split(/\s+/); 
  if (words.length > 10) {
    return words.slice(0, 10).join(" ") + "..."; 
  }
  return text;
};
