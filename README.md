# Senior Frontend Engineer Take-Home Assignment

## Introduction

Thank you for your interest in joining our team as a Senior Frontend Engineer. As part of our hiring process, we'd like to assess your technical skills, problem-solving abilities, and attention to detail through a take-home assignment. This exercise is designed to evaluate not just your coding skills but also your understanding of user experience and design principles. While we estimate that this task should take a few hours, feel free to invest additional time to add any extra features or polish that you think would make your solution stand out.

## Objective

Your primary task is to develop a reusable Dropdown Select component using NextJS. This component should allow users to select a single option from a list and should be versatile enough to be used in forms and multiple instances on the same page.

## Component API Example

Here's what the component API should look like:

```jsx
const options = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

<DropdownSelect
  label="Select a color"
  options={options}
  onChange={(value) => console.log(value)}
  isSearchable
/>;
```

### Technology guidelines

- **Technology Stack:** You must use React and NextJS for this assignment.
- **Styling:** We use [TailwindCSS](https://tailwindcss.com/) internally, but you may use vanilla CSS or any other library you prefer.
- **TypeScript:** It's not a mandatory requirement for this assignment, you are welcome to use it if you prefer.
- **Tests:** Implement tests to ensure the functionality and reliability of your component.

### Design guidelines

This section outlines the functionalities and features that the Dropdown Select component should possess.

- **Dropdown input UI:** Create the user interface for the dropdown input field. This is the element that users will interact with to trigger the dropdown menu.

- **Dropdown menu UI:** Develop the dropdown menu that will appear when the input field is clicked. This menu will display the list of selectable options. Additionally, the currently selected option should be highlighted within the menu to provide visual feedback to the user.

- **Dropdown label:** The component should include a label that serves as a placeholder when no option is selected. Once an option is selected, the label should be replaced by the selected item.

- **Open/close menu handler:** Implement the functionality to open and close the dropdown menu.

- **Select:** Add the logic to handle the selection of items within the dropdown menu. The selected item should be displayed in the input field, and the `onChange` callback should be triggered.

- **Searchable Dropdown:** Implement a search feature within the dropdown menu that allows users to filter through the list of options.

- **Conditional Search Box:** The component should accept an optional prop named `isSearchable`. When this prop is set to true, the search box should be displayed within the dropdown menu. If set to false, the search box should be hidden.

- **onChange Callback:** Implement an `onChange` callback function that will be triggered when an item is selected or deselected. This function should pass the selected value as an argument.

- **Keyboard navigation:** Implement keyboard navigation to allow users to navigate through the dropdown menu using the arrow keys and select items using the enter key.

By following these steps, you should be able to create a Dropdown Select component that is both functional and aligned with our design guidelines.

### User Experience Guidelines

To assist you in understanding the desired user experience and interactions for the Dropdown Select component, we will provide a set of GIF images. These GIFs will serve as visual guides to demonstrate how the component should behave in various scenarios, such as:

- Opening and closing the dropdown menu
<div align="left">
  <img src="https://github.com/washingtonsoares/frontend-take-home-assignment/assets/5726140/8b1d3616-677e-49e7-b2d9-0e46ebd0482d" alt="open-close-menu" />
</div>

- Selecting items
<div align="left">
 <img src="https://github.com/washingtonsoares/frontend-take-home-assignment/assets/5726140/4ae24c61-65c0-4ea2-abce-6666bf0d0032" alt="selecting items" />
</div>

- Searching for items
<div align="left">
 <img src="https://github.com/washingtonsoares/frontend-take-home-assignment/assets/5726140/682afdb9-b4cc-4d7b-b0f0-a6bafcdff02b" alt="searching for items" />
</div>

- Disabled search feature
<div align="left">
 <img src="https://github.com/washingtonsoares/frontend-take-home-assignment/assets/5726140/dec87de2-36dc-4ec1-8753-7fed0d3ec21c" alt="disabled search" />
</div>

<br />
<br />

**Color Palette**

- Dropdown item selected: #0d6efd
- Dropdown item hover: #9fc3f870

However you are totally free to choose your own color scheme if you believe it enhances the component's usability or aesthetics

### Bonus Features

If you found the core task to be relatively straightforward and are interested in going the extra mile, consider implementing the following optional features:

- **Controlled component:** This means it should accept a `value` prop that controls the currently selected option. In addition, the component should also accept an `open` prop to allow the open/closed state of the dropdown menu to be controlled externally.
- **Online Demo:** Deploy a live demo of your component using platforms like Netlify, Vercel, CodeSandbox etc.

### Delivery Instructions

- **Repository:** Submit your solution by providing a link to a public GitHub repository.
- **README:** Include a README.md file in your repository with clear instructions on how to set up and run your project.
- **Questions:** If you encounter any uncertainties or ambiguities, feel free to reach out to us for clarification.

#### We're excited to see what you come up with. Good luck!
