import { SVGProps } from "react";

type DropdownIconProps = SVGProps<SVGSVGElement>;

export default function DropdownIcon(props: DropdownIconProps) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
