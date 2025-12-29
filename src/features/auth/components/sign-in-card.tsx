"use client";

import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import NewLoader from "@/components/Loader";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export function SignInCard({ setState }: SignInCardProps) {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [errors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <>
      {pending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <NewLoader text="SigningIn" />
        </div>
      )}
      <Card className="w-full max-w-md mx-auto p-6 bg-primary-l">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold text-center text-white">Login to Continue</h2>
          <CardDescription className="text-gray-300">
            Use your email and password to continue
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-1 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <TriangleAlert className="size-4" />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="space-y-4">
          <form onSubmit={onPasswordSignIn} className="space-y-4 signin-form">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                disabled={pending}
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#f2f0eb]"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                disabled={pending}
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#f2f0eb]"
                required
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full hover:bg-primary/70">
              Sign In
            </Button>
          </form>

          <Separator />

          <div className="flex flex-col space-y-2 ">
            <Button
              disabled={pending}
              onClick={() => onProviderSignIn("google")}
              variant="outline"
              size="lg"
              className="w-full relative cursor-pointer border hover:border-gray-950"
            >
              <FaGoogle />
              Continue with Google
            </Button>
            <Button
              disabled={pending}
              onClick={() => onProviderSignIn("github")}
              variant="outline"
              size="lg"
              className="w-full relative cursor-pointer border hover:border-gray-950"
            >
              <FaGithub />
              Continue with GitHub
            </Button>
          </div>

          <p className="text-center text-white">
            Don&apos;t have an account ?{" "}
            <span
              onClick={() => setState("signUp")}
              className="text-blue-500 cursor-pointer  hover:underline"
            >
              Sign Up
            </span>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
