"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchIcon } from "lucide-react"; 

interface SearchBarProps {
  onSearch: (query: string) => void; 
  onSearchSubmit: () => void; 
}

export function SearchBar({ onSearch, onSearchSubmit }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchSubmit(); 
    }
  };

  return (
    <div className="searchbar flex items-center gap-2">
      <Input
        type="text"
        placeholder="Search for a joke..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="searchbar_input no-focus flex-1"
      />
      <Button
        onClick={onSearchSubmit} 
        disabled={!query.trim()} 
        className="searchbar_button"
      >
        <SearchIcon className="h-4 w-4 text-gray-400"/>
      </Button>
    </div>
  );
}