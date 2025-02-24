import {
  reducer,
  initialState,
  ADD_HOUSE,
  UPDATE_HOUSE,
  SET_HOUSES,
  DELETE_HOUSE,
  UPDATE_COLOR_HOUSE,
  DUPLICATE_HOUSE,
  UPDATE_COLOR_FLOOR,
} from "../housesReducer";
import { House } from "@/types/house";

describe("housesReducer", () => {
  it("should handle ADD_HOUSE", () => {
    const newHouse: House = {
      id: "1",
      floors: [{ color: "#a65f00" }],
      color: "#a65f00",
    };
    expect(reducer(initialState, { type: ADD_HOUSE, house: newHouse })).toEqual(
      [newHouse]
    );
  });

  it("should handle UPDATE_HOUSE", () => {
    const initialState: House[] = [
      { id: "1", floors: [{ color: "#a65f00" }], color: "#a65f00" },
    ];
    const updatedHouse: House = {
      id: "1",
      floors: [{ color: "#a65f00" }, { color: "#a65f00" }],
      color: "#a65f00",
    };
    expect(
      reducer(initialState, {
        type: UPDATE_HOUSE,
        id: "1",
        numberFloors: 2,
        color: "#a65f00",
      })
    ).toEqual([updatedHouse]);
  });

  it("should handle SET_HOUSES", () => {
    const houses: House[] = [
      { id: "1", floors: [{ color: "#a65f00" }], color: "#a65f00" },
    ];
    expect(reducer(initialState, { type: SET_HOUSES, houses })).toEqual(houses);
  });

  it("should handle DELETE_HOUSE", () => {
    const initialState: House[] = [
      { id: "1", floors: [{ color: "#a65f00" }], color: "#a65f00" },
    ];
    expect(reducer(initialState, { type: DELETE_HOUSE, id: "1" })).toEqual([]);
  });

  it("should handle UPDATE_COLOR_HOUSE", () => {
    const initialState: House[] = [
      { id: "1", floors: [{ color: "#a65f00" }], color: "#a65f00" },
    ];
    const updatedHouse: House = {
      id: "1",
      floors: [{ color: "#a65f00" }],
      color: "#ff0000",
    };
    expect(
      reducer(initialState, {
        type: UPDATE_COLOR_HOUSE,
        id: "1",
        color: "#ff0000",
      })
    ).toEqual([updatedHouse]);
  });

  it("should handle DUPLICATE_HOUSE", () => {
    const initialState: House[] = [
      { id: "1", floors: [{ color: "#a65f00" }], color: "#a65f00" },
    ];
    const duplicatedHouse: House = {
      id: "2",
      floors: [{ color: "#a65f00" }],
      color: "#a65f00",
    };
    expect(
      reducer(initialState, { type: DUPLICATE_HOUSE, house: duplicatedHouse })
    ).toEqual([...initialState, duplicatedHouse]);
  });

  it("should handle UPDATE_COLOR_FLOOR", () => {
    const initialState: House[] = [
      {
        id: "1",
        floors: [{ color: "#a65f00" }, { color: "#a65f00" }],
        color: "#a65f00",
      },
    ];
    const updatedHouse: House = {
      id: "1",
      floors: [{ color: "#ff0000" }, { color: "#a65f00" }],
      color: "#a65f00",
    };
    expect(
      reducer(initialState, {
        type: UPDATE_COLOR_FLOOR,
        id: "1",
        color: "#ff0000",
        indexFloor: 0,
      })
    ).toEqual([updatedHouse]);
  });
});
