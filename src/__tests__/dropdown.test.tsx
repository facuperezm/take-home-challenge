import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropdownSelect from "../app/components/dropdown-select";

describe("DropdownSelect", () => {
  const options = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
  ];

  const user = userEvent.setup();
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test("renders with label when no option is selected", () => {
    render(
      <DropdownSelect
        label="Select color"
        options={options}
        onChange={onChange}
        isSearchable
      />
    );

    expect(screen.getByText("Select color")).toBeDefined();
  });

  test("opens dropdown on click", async () => {
    render(
      <DropdownSelect
        label="Select color"
        options={options}
        onChange={onChange}
        isSearchable
      />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    // Verify dropdown is open by checking if options are visible
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeDefined();
    });
  });

  test("selects an option on click", async () => {
    render(
      <DropdownSelect
        label="Select color"
        options={options}
        onChange={onChange}
        isSearchable
      />
    );

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Red"));

    expect(onChange).toHaveBeenCalledWith("red");
    expect(screen.getByText("Red")).toBeInTheDocument();
  });

  test("controlled mode works with value prop", () => {
    render(
      <DropdownSelect
        label="Select color"
        options={options}
        onChange={onChange}
        isSearchable
        value="blue"
        open={false}
      />
    );

    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Blue");
  });

  test("keyboard navigation works", async () => {
    render(
      <DropdownSelect
        label="Select color"
        options={options}
        onChange={onChange}
        isSearchable
      />
    );

    await user.click(screen.getByRole("button"));

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");

    await user.keyboard("{Enter}");

    expect(onChange).toHaveBeenCalledWith("blue");
    expect(screen.getByRole("button")).toHaveTextContent("Blue");
  });

  test("search functionality filters options correctly", async () => {
    render(
      <DropdownSelect
        label="Select color"
        options={options}
        onChange={onChange}
        isSearchable
      />
    );

    await user.click(screen.getByRole("button"));
    const searchInput = screen.getByRole("textbox");

    // Test exact match
    await user.type(searchInput, "blue");
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.queryByText("Red")).not.toBeInTheDocument();
    expect(screen.queryByText("Green")).not.toBeInTheDocument();

    // Clear and test partial match
    await user.clear(searchInput);
    await user.type(searchInput, "re");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Green")).toBeInTheDocument();
    expect(screen.queryByText("Blue")).not.toBeInTheDocument();
  });

  test("selects option with single Enter press", async () => {
    render(
      <DropdownSelect
        label="Select color"
        options={options}
        onChange={onChange}
        isSearchable
      />
    );

    await user.click(screen.getByRole("button"));
    await user.keyboard("{ArrowDown}"); // Highlight first option
    await user.keyboard("{Enter}"); // Should select immediately

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("red");
    expect(screen.getByRole("button")).toHaveTextContent("Red");
    // Verify dropdown is closed
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
