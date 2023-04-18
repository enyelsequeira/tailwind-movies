"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export const Buttons = () => {
  return (
    <>
      <button
        className="bg-white text-black rounded-md px-3"
        onClick={() => signIn("google")}
      >
        GOOGLE
      </button>
      <button
        className="bg-white text-black rounded-md  px-3"
        onClick={() => signIn("github")}
      >
        Github
      </button>
    </>
  );
};
