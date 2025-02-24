import React from "react";
import { render, screen, fireEvent } from "@/test-utils/test-utils";
import { House } from "../House";

const mockHouse = {
  id: "1",
  floors: [{ color: "#a65f00" }, { color: "#ff0000" }],
  color: "#a65f00",
};

describe("House", () => {
  it("renders the house with the correct number of floors", () => {
    render(<House house={mockHouse} />);

    expect(screen.getAllByRole("floor-region")).toHaveLength(
      mockHouse.floors.length
    );
  });

  it("opens the color dialog when the adjust color button is clicked", () => {
    render(<House house={mockHouse} />);

    fireEvent.click(screen.getAllByLabelText("Adjust color")[0]);

    expect(
      screen.getByText("Update the color of the floor")
    ).toBeInTheDocument();
  });

  it("updates the floor color when the save button is clicked", () => {
    render(<House house={mockHouse} />);

    fireEvent.click(screen.getAllByLabelText("Adjust color")[0]);
    fireEvent.change(screen.getByLabelText("Color:"), {
      target: { value: "#00ff00" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(
      screen.queryByText("Update the color of the floor")
    ).not.toBeInTheDocument();
  });

  it("closes the color dialog when the close button is clicked", () => {
    render(<House house={mockHouse} />);

    fireEvent.click(screen.getAllByLabelText("Adjust color")[0]);
    fireEvent.click(screen.getByLabelText("Close"));

    expect(
      screen.queryByText("Update the color of the floor")
    ).not.toBeInTheDocument();
  });
});
