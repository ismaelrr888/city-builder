import React from "react";
import { render, screen, fireEvent } from "@/test-utils/test-utils";
import { HouseBuilder } from "../HouseBuilder";

describe("HouseBuilder", () => {
  it("renders the house builder component", () => {
    render(<HouseBuilder />);

    expect(screen.getByText("Houses List")).toBeInTheDocument();
    expect(screen.getByText("Build a new house")).toBeInTheDocument();
  });

  it('adds a new house when the "Build a new house" button is clicked', () => {
    render(<HouseBuilder />);

    fireEvent.click(screen.getByRole("button", { name: "Build a new house" }));

    expect(screen.getAllByRole("item-region")).toHaveLength(1);
  });

  it("opens the confirm dialog when the delete button is clicked", () => {
    render(<HouseBuilder />);

    fireEvent.click(screen.getByRole("button", { name: "Build a new house" }));
    fireEvent.click(screen.getByRole("button", { name: "Delete house" }));

    expect(
      screen.getByText("Are you sure you want to delete this house?")
    ).toBeInTheDocument();
  });

  it("deletes a house when the delete button in the confirm dialog is clicked", () => {
    render(<HouseBuilder />);

    fireEvent.click(screen.getByRole("button", { name: "Build a new house" }));
    fireEvent.click(screen.getByRole("button", { name: "Delete house" }));
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("closes the confirm dialog when the close button is clicked", () => {
    render(<HouseBuilder />);

    fireEvent.click(screen.getByRole("button", { name: "Build a new house" }));
    fireEvent.click(screen.getByRole("button", { name: "Delete house" }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(
      screen.queryByText("Are you sure you want to delete this house?")
    ).not.toBeInTheDocument();
  });
});
