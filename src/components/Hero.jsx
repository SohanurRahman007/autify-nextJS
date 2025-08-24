"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/join-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Thank you for Joining!");
        setEmail("");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error, please try again later");
    }

    setLoading(false);
  };

  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">
              Easiest way to create your website
            </h1>

            <div className="mt-8 space-y-5">{/* feature list */}</div>
          </div>

          <div className="w-full mt-8 bg-transparent border rounded-md lg:max-w-sm dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-400 focus-within:ring-opacity-40">
            <form
              className="flex flex-col lg:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                handleJoin();
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
              />
              <button
                type="submit"
                disabled={loading}
                className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 disabled:opacity-50"
              >
                {loading ? "Joining..." : "Join Us"}
              </button>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
          <img
            className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
            src="https://images.unsplash.com/photo-1543269664-7eef42226a21?auto=format&fit=crop&w=1470&q=80"
            alt="glasses photo"
          />
        </div>
      </div>
    </section>
  );
}
