import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { registerInput } from "../../../common/src/index"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { toast } = useToast();

  const user = {
    email,
    password,
  };

  const validateInput = () => {
    const result = registerInput.safeParse(user);
    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        email: errorMessages.email ? errorMessages.email[0] : "",
        password: errorMessages.password ? errorMessages.password[0] : "",
      });
      return false;
    }
    setErrors({ email: "", password: "" });
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;
    setButtonDisabled(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8787/api/v1/user/register",
        user
      );
      toast({
        title: "Success",
        description: "User registered successfully!",
        duration: 3000,
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: "Failed to register user. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Insight Journal</h1>
        <p className="text-muted-foreground">
          Create an account to start journaling.
        </p>
      </div>
      <div className="space-y-4 p-6 rounded-md bg-card shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`border-blue-500 focus:border-blue-400 focus:ring-blue-700 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`border-blue-500 focus:border-blue-400 focus:ring-blue-700 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <Button
          className={`w-full ${
            buttonDisabled ? "bg-gray-500" : "bg-gray-700 dark:bg-white dark:text-black"
          } text-white`}
          onClick={handleSubmit}
          disabled={buttonDisabled}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}