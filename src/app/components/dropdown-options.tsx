import { RefObject } from "react";
import { cn } from "../utils";

interface Option {
  value: string;
  label: string;
}

interface DropdownOptionsProps {
  isOpen: boolean;
  isSearchable: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredOptions: Option[];
  selectedOption: Option | null;
  highlightedIndex: number;
  optionsRef: RefObject<HTMLUListElement | null>;
  searchInputRef: RefObject<HTMLInputElement | null>;
  onOptionSelect: (option: Option) => void;
}

export default function DropdownOptions({
  isOpen,
  isSearchable,
  searchQuery,
  setSearchQuery,
  filteredOptions,
  selectedOption,
  highlightedIndex,
  optionsRef,
  searchInputRef,
  onOptionSelect,
}: DropdownOptionsProps) {
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
      <ul ref={optionsRef} className="max-h-60 overflow-auto">
        {filteredOptions.map((option, index) => (
          <li
            key={option.value}
            onClick={() => onOptionSelect(option)}
            className={cn(
              "px-4 py-2 cursor-pointer hover:bg-[#9fc3f870]",
              highlightedIndex === index && "bg-[#9fc3f870]",
              selectedOption?.value === option.value &&
                "bg-[#0d6efd] text-white"
            )}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
