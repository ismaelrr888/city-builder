import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

describe("Header", () => {
  it("renders the header with the correct class name and children", () => {
    const className = "test-class";
    const children = "Test Header";

    render(<Header className={className}>{children}</Header>);

    const headerElement = screen.getByText(children);
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass(className);
  });

  it("renders the header without a class name", () => {
    const children = "Test Header";

    render(<Header>{children}</Header>);

    const headerElement = screen.getByText(children);
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).not.toHaveClass();
  });
});
