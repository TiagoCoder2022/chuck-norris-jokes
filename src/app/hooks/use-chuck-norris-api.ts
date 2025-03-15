"use client"
import { useState } from "react";

export type Joke = {
  id: string;
  value: string;
  categories: string[];
  created_at: string;
  icon_url: string;
  url: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.chucknorris.io/jokes";;

export function useChuckNorrisApi() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async (endpoint: string): Promise<Joke | null> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${endpoint}`);
      const data: Joke = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar piada:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchJokes = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/search?query=${query}`);
      const data = await response.json();
      setJokes(data.result || []);
    } catch (error) {
      console.error("Erro ao buscar piadas:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomJoke = async () => {
    return fetchJoke("random");
  };

  const getJokeById = async (id: string) => {
    return fetchJoke(id);
  };

  return { jokes, loading, searchJokes, getRandomJoke, getJokeById };
}