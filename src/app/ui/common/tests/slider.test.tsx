import { render, screen, fireEvent } from "@testing-library/react";
import { Slider } from "../Slider";

describe("Slider", () => {
  it("renders the slider with the correct initial value", () => {
    const value = [50];
    render(<Slider max={100} min={0} value={value} onValueChange={() => {}} />);

    const thumbElement = screen.getByRole("slider");
    expect(thumbElement).toBeInTheDocument();
    expect(thumbElement).toHaveAttribute("aria-valuenow", value[0].toString());
  });

  it("calls the onValueChange handler when the value changes", () => {
    const handleValueChange = jest.fn();
    const value = [50];
    render(
      <Slider
        max={100}
        min={0}
        value={value}
        onValueChange={handleValueChange}
      />
    );

    const thumbElement = screen.getByRole("slider");
    fireEvent.keyDown(thumbElement, { key: "ArrowRight", code: "ArrowRight" });
    expect(handleValueChange).toHaveBeenCalled();
  });
});
