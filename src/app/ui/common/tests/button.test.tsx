import React from "react";
import { render, screen, fireEvent } from "@/test-utils/test-utils";
import { Button } from "../button";

describe("Button", () => {
  it("renders the button with the correct text", () => {
    const text = "Click Me";
    render(<Button>{text}</Button>);

    const buttonElement = screen.getByText(text);
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies the correct class names", () => {
    const text = "Click Me";
    const className = "custom-class";
    render(<Button className={className}>{text}</Button>);

    const buttonElement = screen.getByText(text);
    expect(buttonElement).toHaveClass(
      "flex gap-2 border rounded bg-white py-2 px-4 border-gray-300"
    );
    expect(buttonElement).toHaveClass(className);
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    const text = "Click Me";
    render(<Button onClick={handleClick}>{text}</Button>);

    const buttonElement = screen.getByText(text);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("passes additional props to the button element", () => {
    const text = "Click Me";
    render(<Button data-testid="custom-button">{text}</Button>);

    const buttonElement = screen.getByTestId("custom-button");
    expect(buttonElement).toBeInTheDocument();
  });
});
