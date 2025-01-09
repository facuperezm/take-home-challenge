import { useRef, useState, useEffect, useCallback, useMemo } from "react";

interface DropdownSelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  isSearchable: boolean;
  value?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useDropdown({
  options,
  onChange,
  isSearchable,
  value, // controlled value
  open, // controlled open state
  onOpenChange, // controlled open state callback
}: DropdownSelectProps) {
  const [uncontrolledSelectedOption, setUncontrolledSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(() =>
    value ? options.find((opt) => opt.value === value) || null : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Check if we're in controlled mode
  const isOpenControlled = open !== undefined;

  // if we're in controlled mode, use the open prop
  // otherwise, use the internal state
  const isOpen = isOpenControlled ? open : uncontrolledIsOpen;

  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // derived state for the filtered options
  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [options, searchQuery]
  );

  const handleOptionSelect = useCallback(
    (option: { value: string; label: string } | null) => {
      const isDeselecting = uncontrolledSelectedOption?.value === option?.value;
      setUncontrolledSelectedOption(isDeselecting ? null : option);
      onChange(option?.value ?? "");

      if (isOpenControlled) {
        onOpenChange?.(false);
      } else {
        setUncontrolledIsOpen(false);
      }
      containerRef.current?.focus();
    },
    [
      uncontrolledSelectedOption?.value,
      onChange,
      isOpenControlled,
      onOpenChange,
    ]
  );

  // handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

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
          if (!isOpenControlled) setUncontrolledIsOpen(false);
          containerRef.current?.focus();
          break;
      }
    },
    [
      isOpen,
      filteredOptions,
      highlightedIndex,
      handleOptionSelect,
      isOpenControlled,
    ]
  );

  // add event listener for keyboard navigation
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const toggleDropdown = useCallback(() => {
    const newIsOpen = !isOpen;

    if (isOpenControlled) {
      // In controlled mode, call the callback
      onOpenChange?.(newIsOpen);
    } else {
      // In uncontrolled mode, update internal state
      setUncontrolledIsOpen(newIsOpen);
    }
  }, [isOpen, isOpenControlled, onOpenChange]);

  // reset the highlighted index when the search query or the dropdown is opened
  // otherwise the highlighted index will be stuck on the last option

  useEffect(() => {
    if (!uncontrolledIsOpen) setHighlightedIndex(-1);
  }, [uncontrolledIsOpen]);

  useEffect(() => {
    if (searchQuery) setHighlightedIndex(-1);
  }, [searchQuery]);

  return {
    selectedOption: uncontrolledSelectedOption,
    searchQuery,
    setSearchQuery,
    isOpen,
    highlightedIndex,
    filteredOptions,
    containerRef,
    isSearchable,
    searchInputRef,
    optionsRef,
    handleOptionSelect,
    toggleDropdown,
  };
}
