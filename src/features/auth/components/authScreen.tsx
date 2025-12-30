"use client";
import { useState } from "react";
import { SignInCard } from "./signInCard";
import { SignUpCard } from "./signUpCard";
import type { SignInFlow } from "../types";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <div className="h-screen flex items-center justify-center bg-primary">
      <div className="md-h-auto md:w-[420px]">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};
