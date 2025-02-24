import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WeatherComponent from "../Weather";

const mockFetch = jest.fn();

global.fetch = mockFetch;

const mockWeatherData = {
  current_weather: {
    temperature: 20,
    weathercode: 0,
  },
};

beforeEach(() => {
  mockFetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockWeatherData),
  });
});

describe("WeatherComponent", () => {
  it("renders the weather component with initial country and weather", async () => {
    render(<WeatherComponent />);

    expect(screen.getByText("Sofia")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("20°C")).toBeInTheDocument());
    expect(screen.getByText("☀️")).toBeInTheDocument();
  });

  it("changes the weather when a different country is selected", async () => {
    render(<WeatherComponent />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "New York" },
    });

    await waitFor(() => expect(screen.getByText("20°C")).toBeInTheDocument());
    expect(screen.getByText("☀️")).toBeInTheDocument();
  });
});
