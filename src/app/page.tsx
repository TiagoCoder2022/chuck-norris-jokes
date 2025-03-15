"use client";

import { useState } from "react";
import { SearchBar } from "@/components/searchbar";
import { Button } from "@/components/ui/button";
import { useChuckNorrisApi } from "./hooks/use-chuck-norris-api";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { getRandomJoke } = useChuckNorrisApi();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (query.trim()) {
      setLoading(true);
      await router.push(`/jokes?query=${encodeURIComponent(query)}`);
      setLoading(false);
    }
  };

  const handleLuckySearch = async () => {
    setLoading(true);
    const joke = await getRandomJoke();

    if (joke) {      
      router.push(`/jokes?id=${encodeURIComponent(joke.id)}`);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <section className="max-w-3xl w-full px-6 text-center space-y-10 py-10">
        <div className="flex justify-center gap-4 items-center">
          <Image src="/chuck.jpg" alt="Chuck Norris" width={60} height={60} className="rounded-full" />
          <p className="text-gray-100 text-base-medium">Chuck Norris Jokes</p>
        </div>

        <div>
          <h1 className="head-text text-white">Feeling upset today?</h1>
          <p className="text-base-regular text-gray-400 pt-4">We have the best Chuck Norris jokes for you</p>
        </div>
        
        <SearchBar
          onSearch={(value) => setQuery(value)} 
          onSearchSubmit={handleSearch}
        />

        <div className="flex flex-row justify-center gap-8 py-5">
          <Button
            variant="outline"
            className="text-white hover:bg-gray-100 hover:text-dark-1 transform duration-300"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </Button>

          <Button
            className="py-2 rounded-lg px-3 text-base font-semibold bg-primary-500 text-dark-2 hover:text-white transform duration-300"
            onClick={handleLuckySearch}
            disabled={loading}
          >
            {loading ? "Loading..." : "I'm feeling lucky"}
          </Button>
        </div>        
      </section>
      <footer>
        <p className="text-small-regular text-zinc-500">
          Developed by Tiago, all rights reserved
        </p>
      </footer>
    </main>
  );
}