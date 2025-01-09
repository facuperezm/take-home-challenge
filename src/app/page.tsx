"use client";
import { useState } from "react";
import DropdownSelect from "./components/dropdown-select";
import { cn } from "./utils";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  const options = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
    { value: "yellow", label: "Yellow" },
    { value: "purple", label: "Purple" },
    { value: "orange", label: "Orange" },
    { value: "pink", label: "Pink" },
    { value: "brown", label: "Brown" },
    { value: "gray", label: "Gray" },
  ];

  const defaultValue = "red";

  return (
    <main className="flex flex-col items-center justify-items-center px-8 pt-20 gap-16 min-h-screen ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Take Home Assignment
      </h1>
      <div className="flex flex-1 flex-row gap-16">
        <article>
          <h2>Controlled Dropdown</h2>
          <div className="flex flex-row gap-2 mb-2 items-center">
            <button
              className="bg-white rounded-md border text-sm border-gray-200 px-2 py-1 "
              onClick={() => setIsOpen(!isOpen)}
            >
              Toggle (external state)
            </button>
            <small
              className={cn(
                "text-xs text-gray-500 rounded-xl px-2 py-1 ",
                isOpen ? "bg-green-200" : "bg-red-200"
              )}
            >
              {isOpen ? "Open" : "Closed"}
            </small>
            <small className="text-xs text-gray-500 rounded-xl px-2 py-1 bg-gray-200">
              Default value is {defaultValue}
            </small>
          </div>
          <DropdownSelect
            label="Select color"
            options={options}
            onChange={console.log}
            isSearchable
            value={defaultValue}
            open={isOpen}
            onOpenChange={setIsOpen}
          />
        </article>

        <article>
          <h2>Uncontrolled Dropdown</h2>
          <DropdownSelect
            label="Select color"
            options={options}
            onChange={console.log}
            isSearchable
          />
        </article>

        <article>
          <h2>Uncontrolled Dropdown with no search</h2>
          <DropdownSelect
            label="Select color"
            options={options}
            onChange={console.log}
            isSearchable={false}
          />
        </article>
      </div>
      <footer className="mt-autotext-center text-xs text-gray-500 p-4">
        <p>
          Created by{" "}
          <a
            href="https://facuperezm.com"
            target="_blank"
            className="hover:underline"
          >
            Facundo Perez Montalvo
          </a>
        </p>
      </footer>
    </main>
  );
}
