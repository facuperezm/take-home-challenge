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
    isOpen,
    buttonRef,
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
    <div className="relative w-[300px]">
      <button
        ref={buttonRef}
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
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
        options={options}
        onClose={toggleDropdown}
      />
    </div>
  );
}
