"use client";
import DropdownSelect from "./components/dropdown-select";

export default function Home() {
  const options = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <h1>Take Home Assignment</h1>
      <DropdownSelect
        label="Select a colorcito"
        options={options}
        onChange={(value) => console.log(value)}
        isSearchable
      />
    </div>
  );
}
