"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (isRegister) {
      const response = await fetch(`/api/register`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("success registration! please login.");
        setIsRegister(false); 
      } else {
        alert("registation failure, this email could be used already");
      }
    } else {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response?.error) {
        router.push("/");
        router.refresh();
      } else {
        alert("login failure, please check your email and password.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <h2 className="text-2xl font-bold mb-4">{isRegister ? "Register" : "Log In"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          name="email"
          className="border border-teal-500 text-black py-2 px-4 rounded"
          type="email"
          placeholder="Email"
          required
        />
        <input
          name="password"
          className="border border-teal-500 text-black py-2 px-4 rounded"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-00 transition">
          {isRegister ? "Register" : "Log In"}
        </button>
      </form>

      {!isRegister && (
        <div className="flex flex-col gap-2 w-full border-gray-500 ">
          <button onClick={() => signIn("google")} className="bg-white text-black border border-teal-500 py-2 px-4 rounded hover:bg-teal-100 mt-4">
            Using Google Login
          </button>
          <button onClick={() => signIn("github")} className="bg-white text-black border border-teal-500 py-2 px-4 rounded hover:bg-teal-100 mt-2">
            Using GitHub Login
          </button>
        </div>
      )}

      <p className="mt-4">
        {isRegister ? "Already having accout?" : "Without account?"}{" "}
        <button onClick={() => setIsRegister(!isRegister)} className="text-teal-500 border border-b-emerald-700 px-4">
          {isRegister ? "to login " : "to register"}
        </button>
      </p>
    </div>
  );
}