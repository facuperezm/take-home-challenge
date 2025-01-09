import { SVGProps } from "react";
import { cn } from "../utils";

type DropdownIconProps = SVGProps<SVGSVGElement>;

export default function DropdownIcon(props: DropdownIconProps) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className={cn("size-4", props.className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
