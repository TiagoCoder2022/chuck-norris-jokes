import { render, screen } from "@testing-library/react";
import { JokeCardItem } from "@/components/jokes-cards-item"; 

const mockJoke = {
  id: "1",
  value: "Chuck Norris can divide by zero.",
  categories: ["math"],
  created_at: "2020-01-05T13:42:28.664997Z",
  icon_url: "https://example.com/icon.png",
  url: "https://example.com/joke/1",
};

describe("JokeCardItem", () => {
  it("renders the joke text and category", () => {
    render(<JokeCardItem joke={mockJoke} />);
  
    expect(screen.getByText("Chuck Norris can divide by zero.")).toBeInTheDocument();
    
    // Verifica se há pelo menos um elemento com o texto "Category: math"
    const categoryElements = screen.getAllByText("Category: math");
    expect(categoryElements.length).toBeGreaterThan(0);
  });

  it("highlights the search term in the joke text", () => {
    render(<JokeCardItem joke={mockJoke} searchTerm="Chuck" />);

    const highlightedText = screen.getByText("Chuck");
    expect(highlightedText).toHaveClass("text-purple-400");
  });
});