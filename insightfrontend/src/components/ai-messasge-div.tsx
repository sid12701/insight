import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface MessageDivProps {
  role: string;
  message: string;
  avatarFallback: string;
}

// const UserMessageDiv = ({ content }: MessageDivProps) => {
//   return (
//     <div className="flex items-start gap-4">
//       <Avatar />
//       <div className="grid gap-1 rounded-lg bg-muted p-3">
//         <div className="font-medium">John Doe</div>
//         <div>{content}</div>
//       </div>
//     </div>
//   );
// };

const AiMessageDiv = ({ role,message,avatarFallback }: MessageDivProps) => {
  const messageLines = message.split(/\d+\.\s/).filter(line => line.trim() !== "");
  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1 rounded-lg bg-muted p-3">
        <div className="font-medium">{role}</div>
        <div>
        <ol className="list-decimal pl-5">
            {messageLines.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AiMessageDiv;
