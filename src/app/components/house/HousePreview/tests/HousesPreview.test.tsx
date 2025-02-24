import { render, screen } from "@/test-utils/test-utils";
import { HousesPreview } from "../HousesPreview";
import { useHouses } from "@/app/context/houses/HousesContext";

const mockHouses = [
  { id: "1", floors: [{ color: "#a65f00" }], color: "#a65f00" },
  { id: "2", floors: [{ color: "#ff0000" }], color: "#ff0000" },
];

jest.mock("../../../../context/houses/HousesContext", () => ({
  ...jest.requireActual("../../../../context/houses/HousesContext"),
  useHouses: jest.fn(),
}));

describe("HousesPreview", () => {
  beforeEach(() => {
    (useHouses as jest.Mock).mockReturnValue({ houses: mockHouses });
  });

  it("renders the correct number of houses", () => {
    render(<HousesPreview />);

    expect(screen.getAllByRole("region")).toHaveLength(mockHouses.length);
  });

  it("renders each house with the correct color", () => {
    render(<HousesPreview />);

    mockHouses.forEach((house) => {
      expect(
        screen.getByLabelText(`Floor with color ${house.floors[0].color}`)
      ).toBeInTheDocument();
    });
  });
});
