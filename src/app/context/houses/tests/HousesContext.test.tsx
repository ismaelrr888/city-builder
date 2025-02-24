import React from "react";
import { renderHook, act } from "@testing-library/react";
import { HousesProvider, useHouses } from "../HousesContext";

describe("HousesContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <HousesProvider>{children}</HousesProvider>
  );

  it("should provide initial state", () => {
    const { result } = renderHook(() => useHouses(), { wrapper });
    expect(result.current.houses).toEqual([]);
  });

  it("should add a house", () => {
    const { result } = renderHook(() => useHouses(), { wrapper });

    act(() => {
      result.current.handleAddHouse();
    });

    expect(result.current.houses.length).toBe(1);
  });

  it("should update a house", () => {
    const { result } = renderHook(() => useHouses(), { wrapper });

    act(() => {
      result.current.handleAddHouse();
    });

    const houseId = result.current.houses[0].id;

    act(() => {
      result.current.handleUpdateHouse(houseId, 2, "#ff0000");
    });

    expect(result.current.houses[0].floors.length).toBe(2);
    expect(result.current.houses[0].color).toBe("#a65f00");
  });

  it("should delete a house", () => {
    const { result } = renderHook(() => useHouses(), { wrapper });

    act(() => {
      result.current.handleAddHouse();
    });

    const houseId = result.current.houses[0].id;

    act(() => {
      result.current.handleDeleteHouse(houseId);
    });

    expect(result.current.houses.length).toBe(0);
  });

  it("should update house color", () => {
    const { result } = renderHook(() => useHouses(), { wrapper });

    act(() => {
      result.current.handleAddHouse();
    });

    const houseId = result.current.houses[0].id;

    act(() => {
      result.current.handleUpdateColorHouse(houseId, "#ff0000");
    });

    expect(result.current.houses[0].color).toBe("#ff0000");
  });

  it("should duplicate a house", () => {
    const { result } = renderHook(() => useHouses(), { wrapper });

    act(() => {
      result.current.handleAddHouse();
    });

    const house = result.current.houses[0];

    act(() => {
      result.current.handleDuplicateHouse(house);
    });

    expect(result.current.houses.length).toBe(2);
  });

  it("should update floor color", () => {
    const { result } = renderHook(() => useHouses(), { wrapper });

    act(() => {
      result.current.handleAddHouse();
    });

    const houseId = result.current.houses[0].id;

    act(() => {
      result.current.handleUpdateColorFloor(houseId, "#ff0000", 0);
    });

    expect(result.current.houses[0].floors[0].color).toBe("#ff0000");
  });

  it("should serialize and deserialize houses", () => {
    const { result } = renderHook(() => useHouses(), { wrapper });

    act(() => {
      result.current.handleAddHouse();
    });

    act(() => {
      result.current.onSerialize();
    });

    const storedHouses = JSON.parse(localStorage.getItem("houses") || "[]");
    expect(storedHouses.length).toBe(1);

    act(() => {
      result.current.onDeserialize();
    });

    expect(result.current.houses.length).toBe(1);
  });
});
