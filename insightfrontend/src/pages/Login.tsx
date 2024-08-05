"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookie from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = {
    email,
    password,
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8787/api/v1/user/login",user
      );
      let userLoggedIn = response.data;
      const token = userLoggedIn.token
      Cookie.set('token',token)
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Insight Journal</h1>
        <p className="text-muted-foreground">
          Login to continue journaling.
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
            className="border-blue-500 focus:border-blue-400 focus:ring-blue-700"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-blue-500 focus:border-blue-400 focus:ring-blue-700"
          />
        </div>
        <Button className="w-full" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
}
