import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Joke {
  id: string;
  value: string;
  categories: string[];
  created_at: string;
  icon_url: string;
  url: string;
}

interface JokeCardProps {
  joke: Joke;
  searchTerm?: string;
}

export function JokeCardItem({ joke, searchTerm }: JokeCardProps) {  
  
  const sanitize = (text: string) => {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
  
  const highlightSearchTerm = (text: string, term: string) => {
    if (!term) return text;
    const sanitizedTerm = sanitize(term);
    const regex = new RegExp(`(${sanitizedTerm})`, "gi");
    return text.replace(
      regex,
      "<span class='text-purple-400 font-bold'>$1</span>"
    );
  };

  return (
    <Card className="w-full max-w-3xl min-h-64 bg-dark-2 text-white shadow-lg border border-zinc-700">
      <CardHeader className="flex flex-row justify-between items-center gap-4">         
        <div className="flex flex-row items-center gap-4">
          {joke.icon_url ? (
            <Image
              src={joke.icon_url}
              width={40}
              height={40}
              alt="Chuck Norris"
              className="w-12 h-12 rounded-full"
              unoptimized
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
              <span className="text-white text-lg">CN</span>
            </div>
          )}
          <div>
            <CardTitle className="text-body-medium">Chuck Norris Joke</CardTitle>
            <p className="text-small-regular text-gray-1">Created at: {new Date(joke.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="hidden md:block">
          {Array.isArray(joke.categories) && joke.categories.length > 0 && (
            <span className="bg-primary-500 text-small-semibold text-white px-3 py-2 rounded-full">
              Category: {joke.categories.join(", ")}
            </span>          
          )}
        </div>
                
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="block md:hidden">
          {Array.isArray(joke.categories) && joke.categories.length > 0 && (
            <span className="bg-primary-500 text-small-semibold text-white px-2 py-1 rounded-full">
              Category: {joke.categories.join(", ")}
            </span>          
          )}
        </div>
        {/* Highlights the searched term in joke.value */}
        <h1
          className="text-body-medium md:text-heading4-medium text-white py-8"
          dangerouslySetInnerHTML={{
            __html: highlightSearchTerm(joke.value, searchTerm || ""),
          }}
        />

        <div className="flex justify-center gap-1 group">
          <a href={joke.url} target="_blank" rel="noopener noreferrer" className="text-small-regular md:text-base-regular text-gray-400 group-hover:text-gray-200 transform duration-300">
            See on API
          </a>
          <ArrowUpRight size={16} className="text-gray-400 group-hover:text-gray-200 transform duration-300" />
        </div>
      </CardContent>
    </Card>
  );
}