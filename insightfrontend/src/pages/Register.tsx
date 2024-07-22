"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = {
    email,
    password,
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://insightbackend.siddhantdaryanani.workers.dev/api/v1/user/register",
        user
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
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
          />
        </div>
        <Button className="w-full" onClick={handleSubmit}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
