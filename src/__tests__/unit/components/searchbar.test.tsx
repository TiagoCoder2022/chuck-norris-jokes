import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "@/components/searchbar";

describe("SearchBar", () => {
  it("renders the search input and button", () => {
    render(<SearchBar onSearch={() => {}} onSearchSubmit={() => {}} />);

    expect(screen.getByPlaceholderText("Search for a joke...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onSearch when typing in the input", () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} onSearchSubmit={() => {}} />);

    const input = screen.getByPlaceholderText("Search for a joke...");
    fireEvent.change(input, { target: { value: "Chuck" } });

    expect(onSearch).toHaveBeenCalledWith("Chuck");
  });

  it("calls onSearchSubmit when pressing Enter", () => {
    const onSearchSubmit = jest.fn();
    render(<SearchBar onSearch={() => {}} onSearchSubmit={onSearchSubmit} />);

    const input = screen.getByPlaceholderText("Search for a joke...");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(onSearchSubmit).toHaveBeenCalled();
  });
});