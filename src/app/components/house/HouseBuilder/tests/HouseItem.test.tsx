import { render, screen, fireEvent } from "@/test-utils/test-utils";
import { useHouses } from "@/app/context/houses/HousesContext";
import HouseItem from "../HouseItem";

jest.mock("../../../../context/houses/HousesContext", () => ({
  ...jest.requireActual("../../../../context/houses/HousesContext"),
  useHouses: jest.fn(),
}));

const mockHouse = {
  id: "1",
  floors: [{ color: "#a65f00" }],
  color: "#a65f00",
};

describe("HouseItem", () => {
  const handleUpdateColorHouse = jest.fn();
  const handleDuplicateHouse = jest.fn();
  const handleOpenConfirmDialog = jest.fn();

  beforeEach(() => {
    (useHouses as jest.Mock).mockReturnValue({
      handleUpdateColorHouse,
      handleDuplicateHouse,
    });
  });

  it("renders the house item component", () => {
    render(
      <HouseItem
        house={mockHouse}
        handleOpenConfirmDialog={handleOpenConfirmDialog}
      />
    );

    expect(screen.queryByText("House -")).toBeInTheDocument();
    expect(screen.queryByText(`Floors:`)).toBeInTheDocument();
    expect(screen.queryByText(`Color:`)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Duplicate house" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Delete house" })
    ).toBeInTheDocument();
  });

  it("calls handleDuplicateHouse when the duplicate button is clicked", () => {
    render(
      <HouseItem
        house={mockHouse}
        handleOpenConfirmDialog={handleOpenConfirmDialog}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Duplicate house" }));

    expect(handleDuplicateHouse).toHaveBeenCalled();
  });

  it("calls handleOpenConfirmDialog when the delete button is clicked", () => {
    const handleOpenConfirmDialog = jest.fn();
    render(
      <HouseItem
        house={mockHouse}
        handleOpenConfirmDialog={handleOpenConfirmDialog}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Delete house" }));

    expect(handleOpenConfirmDialog).toHaveBeenCalledWith(mockHouse.id);
  });
});
