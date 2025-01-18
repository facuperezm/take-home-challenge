import { useRef, useState } from "react";

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
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Check if we're in controlled mode
  const isOpenControlled = open !== undefined;

  // if we're in controlled mode, use the open prop
  // otherwise, use the internal state
  const isOpen = isOpenControlled ? open : uncontrolledIsOpen;

  const handleOptionSelect = (
    option: { value: string; label: string } | null
  ) => {
    const isDeselecting = uncontrolledSelectedOption?.value === option?.value;
    setUncontrolledSelectedOption(isDeselecting ? null : option);
    onChange(
      isDeselecting
        ? `deselected: ${option?.value}`
        : `selected: ${option?.value}`
    );

    if (isOpenControlled) {
      onOpenChange?.(false);
    } else {
      setUncontrolledIsOpen(false);
    }
    buttonRef.current?.focus();
  };

  const toggleDropdown = () => {
    const newIsOpen = !isOpen;

    if (isOpenControlled) {
      onOpenChange?.(newIsOpen);
    } else {
      setUncontrolledIsOpen(newIsOpen);
    }
    if (!newIsOpen) {
      buttonRef.current?.focus();
    }
  };

  return {
    selectedOption: uncontrolledSelectedOption,
    isOpen,
    buttonRef,
    isSearchable,
    handleOptionSelect,
    toggleDropdown,
  };
}
