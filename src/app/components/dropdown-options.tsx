import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../utils";

interface Option {
  value: string;
  label: string;
}

interface DropdownOptionsProps {
  isOpen: boolean;
  isSearchable: boolean;
  selectedOption: Option | null;
  onOptionSelect: (option: Option) => void;
  options: Option[];
  onClose: () => void;
}

export default function DropdownOptions({
  isOpen,
  isSearchable,
  selectedOption,
  onOptionSelect,
  options,
  onClose,
}: DropdownOptionsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  // scroll to the highlighted option
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const option = listRef.current.children[highlightedIndex] as HTMLElement;
      if (option) {
        option.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [highlightedIndex]);

  // handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const maxIndex = filteredOptions.length - 1;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0) {
            onOptionSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case "Tab":
          e.preventDefault();
          setHighlightedIndex((prev) => {
            if (e.shiftKey) {
              if (prev <= 0) return filteredOptions.length - 1;
              return prev - 1;
            }
            if (prev >= filteredOptions.length - 1 || prev === -1) return 0;
            return prev + 1;
          });
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    // add event listener for keyboard navigation
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredOptions, highlightedIndex, onOptionSelect, onClose]);

  // focus the search input when the dropdown is opened and the search is enabled
  useEffect(() => {
    if (isOpen && isSearchable) {
      // Small delay to ensure the dropdown is rendered
      const timeoutId = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, isSearchable, searchInputRef]);

  if (!isOpen) return null;

  return (
    <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
      {isSearchable && (
        <div className="p-2 border-b border-gray-300">
          <input
            type="text"
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      <ul ref={listRef} className="max-h-60 overflow-auto">
        {filteredOptions.map((option, index) => (
          <li
            key={option.value}
            onClick={() => onOptionSelect(option)}
            className={cn(
              "px-4 py-2 cursor-pointer",
              "hover:bg-[#9fc3f870] hover:text-gray-800",
              selectedOption?.value === option.value &&
                "bg-[#0d6efd] text-white",
              highlightedIndex === index && "bg-[#9fc3f870] text-gray-800"
            )}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
