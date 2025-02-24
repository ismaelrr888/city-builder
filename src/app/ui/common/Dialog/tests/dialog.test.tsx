import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmDialog, DialogTitle, DialogClose } from "../dialog";

describe("ConfirmDialog", () => {
  it("renders the dialog with the correct children", () => {
    render(
      <ConfirmDialog open={true} onOpenChange={() => {}}>
        <DialogTitle>Test Title</DialogTitle>
        <p id="dialog-description">Test Content</p>
        <DialogClose>
          <button>Close</button>
        </DialogClose>
      </ConfirmDialog>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("calls onOpenChange when the close button is clicked", () => {
    const handleOpenChange = jest.fn();
    render(
      <ConfirmDialog open={true} onOpenChange={handleOpenChange}>
        <DialogTitle>Test Title</DialogTitle>
        <p id="dialog-description">Test Content</p>
        <DialogClose>
          <button>Close</button>
        </DialogClose>
      </ConfirmDialog>
    );

    fireEvent.click(screen.getByText("Close"));
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not render the dialog when open is false", () => {
    render(
      <ConfirmDialog open={false} onOpenChange={() => {}}>
        <DialogTitle>Test Title</DialogTitle>
        <p id="dialog-description">Test Content</p>
        <DialogClose>
          <button>Close</button>
        </DialogClose>
      </ConfirmDialog>
    );

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Close")).not.toBeInTheDocument();
  });
});
