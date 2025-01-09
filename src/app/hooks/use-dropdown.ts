import { useRef, useState, useEffect, useCallback } from "react";

interface DropdownSelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  isSearchable: boolean;
}

export function useDropdown({
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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // derived state for the filtered options
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionSelect = useCallback(
    (option: { value: string; label: string } | null) => {
      // if the same option is selected, then deselect it
      if (selectedOption?.value === option?.value) {
        setSelectedOption(null);
        onChange(`deselected: ${option?.value}`);
      } else {
        // if a different option is selected, then select it
        setSelectedOption(option);
        onChange(`selected: ${option?.value}`);
      }
      setIsOpen(false);
      containerRef.current?.focus();
    },
    [onChange, selectedOption]
  );

  // handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();

          setHighlightedIndex((prev) => {
            if (prev >= filteredOptions.length - 1 || prev === -1) return 0;
            return prev + 1;
          });
          break;

        case "ArrowUp":
          e.preventDefault();

          setHighlightedIndex((prev) => {
            if (prev <= 0) return filteredOptions.length - 1;
            return prev - 1;
          });
          break;

        case "Enter":
          if (highlightedIndex >= 0) {
            const selectedOption = filteredOptions[highlightedIndex];
            handleOptionSelect(selectedOption);
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

          setIsOpen(false);
          containerRef.current?.focus();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, filteredOptions, handleOptionSelect]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => {
      const newIsOpen = !prev;
      if (newIsOpen && isSearchable) {
        // I'm using setTimeout to focus the search input after the dropdown is opened
        // this is because the search input is not in the DOM when the dropdown is opened
        // so I need to wait for the DOM to be updated before focusing the search input
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
      return newIsOpen;
    });
  }, [isSearchable]);

  // reset the highlighted index when the search query or the dropdown is opened
  // otherwise the highlighted index will be stuck on the last option
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchQuery, isOpen]);

  return {
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
  };
}
