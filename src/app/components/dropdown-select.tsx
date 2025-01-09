"use client";

import { useState } from "react";
import DropdownOptions from "./dropdown-options";
import DropdownIcon from "./dropdown-icon";

interface DropdownSelectProps {
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  isSearchable: boolean;
}

export default function DropdownSelect({
  label,
  options,
  onChange,
  isSearchable,
}: DropdownSelectProps) {
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[300px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md flex items-center justify-between"
      >
        <span className="text-gray-700">
          {selectedOption ? selectedOption.label : label}
        </span>
        <DropdownIcon
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <DropdownOptions
        isOpen={isOpen}
        isSearchable={isSearchable}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredOptions={filteredOptions}
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
      />
    </div>
  );
}
