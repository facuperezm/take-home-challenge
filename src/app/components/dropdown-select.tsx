"use client";

import DropdownOptions from "./dropdown-options";
import DropdownIcon from "./dropdown-icon";
import { cn } from "../utils";
import { useDropdown } from "../hooks/use-dropdown";

interface DropdownSelectProps {
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  isSearchable: boolean;
  value?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function DropdownSelect({
  label,
  options,
  onChange,
  isSearchable,
  value,
  open,
  onOpenChange,
}: DropdownSelectProps) {
  const {
    selectedOption,
    searchQuery,
    setSearchQuery,
    isOpen,
    highlightedIndex,
    filteredOptions,
    containerRef,
    searchInputRef,
    optionsRef,
    handleOptionSelect,
    toggleDropdown,
  } = useDropdown({
    options,
    onChange,
    isSearchable,
    value,
    open,
    onOpenChange,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-[300px]"
      onKeyDown={(e) => {
        // if the dropdown is not open and the user presses enter or space, then open the dropdown
        if (!isOpen && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          toggleDropdown();
        }
      }}
    >
      <button
        data-testid="dropdown-trigger"
        onClick={() => toggleDropdown()}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md flex items-center justify-between"
      >
        <span className="text-gray-700">
          {selectedOption ? selectedOption.label : label}
        </span>
        <DropdownIcon
          className={cn("transition-transform", isOpen && "rotate-180")}
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
        optionsRef={optionsRef}
        searchInputRef={searchInputRef}
        highlightedIndex={highlightedIndex}
      />
    </div>
  );
}
