import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface MessageDivProps {
  role: string;
  message: string;
  avatarFallback: string;
}
const UserMessageDiv = ({ role, message,avatarFallback }: MessageDivProps) => {
  return (
    <div className="flex items-start gap-4 justify-end">
      <div className="grid gap-1 rounded-lg bg-primary p-3 text-primary-foreground">
        <div className="font-medium">{role}</div>
        <div>{message}</div>
      </div>
      <Avatar className="h-8 w-8">
        <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserMessageDiv;
