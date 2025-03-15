"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { JokeCardItem } from "@/components/jokes-cards-item";
import { Joke, useChuckNorrisApi } from "../hooks/use-chuck-norris-api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export function JokesPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const jokeId = searchParams.get("id");

  const { jokes, loading, searchJokes, getJokeById } = useChuckNorrisApi();

  const [searched, setSearched] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomJoke, setRandomJoke] = useState<Joke | null>(null);

  // Busca os detalhes da piada aleatória quando o ID está presente
  useEffect(() => {
    if (jokeId && !randomJoke) {
      const fetchJokeDetails = async () => {
        const joke = await getJokeById(jokeId);
        if (joke) {
          setRandomJoke(joke);
        }
      };

      fetchJokeDetails();
    }
  }, [jokeId, randomJoke, getJokeById]);

  // Busca as piadas quando a query é alterada
  useEffect(() => {
    if (query && !searched) {
      searchJokes(query);
      setSearched(true);
    }
  }, [query, searchJokes, searched]);

  const handleNext = () => {
    if (currentIndex < jokes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <main className="min-h-screen px-5">
      <nav>
        <Link href="/">
          <Button className="mt-5 bg-transparent text-white hover:bg-dark-2 transform duration-300">
            <ArrowLeftIcon />
            Back
          </Button>
        </Link>
      </nav>
      <div className="flex items-center justify-center py-12">
        <div className="max-w-3xl w-full text-center space-y-10">
          <h1 className="text-base1-semibold text-white">
            {jokeId ? "Chuck Norris' Random Joke" : `Results for "${query}"`}
          </h1>

          {/* Carregamento principal */}
          {loading && <p className="text-zinc-300 font-semibold">Loading...</p>}

          {jokeId ? (
            randomJoke ? (
              <section className="flex flex-col items-center justify-between">
                <JokeCardItem joke={randomJoke} />
              </section>
            ) : null
          ) : jokes.length > 0 && !loading ? (
            <>
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-row gap-4">
                  <Button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    variant="outline"
                    className="text-white hover:bg-gray-100 hover:text-dark-1 transform duration-300"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={currentIndex === jokes.length - 1}
                    variant="outline"
                    className="text-white hover:bg-gray-100 hover:text-dark-1 transform duration-300"
                  >
                    Next
                  </Button>
                </div>
                <p className="text-white">
                  {currentIndex + 1} of {jokes.length}
                </p>
              </div>

              <section className="flex flex-col items-center justify-between">
                <JokeCardItem joke={jokes[currentIndex]} searchTerm={query} />
              </section>

              <p className="text-gray-500">You can use the Prev and Next buttons to navigate!</p>
            </>
          ) : (
            !loading && <p className="text-zinc-400">No joke found.</p>
          )}
        </div>
      </div>
    </main>
  );
}