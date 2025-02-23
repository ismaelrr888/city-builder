import { House } from "@/types/house";

export const ADD_HOUSE = "ADD_HOUSE";
export const UPDATE_HOUSE = "UPDATE_HOUSE";
export const SET_HOUSES = "SET_HOUSES";

type Action =
  | { type: typeof ADD_HOUSE; house: House }
  | {
      type: typeof UPDATE_HOUSE;
      id: string;
      numberFloors: number;
      color: string;
    }
  | { type: typeof SET_HOUSES; houses: House[] };

export const initialState: House[] = [];

export const reducer = (state: House[], action: Action): House[] => {
  switch (action.type) {
    case ADD_HOUSE:
      return [...state, action.house];
    case UPDATE_HOUSE:
      return state.map((house) =>
        house.id === action.id
          ? { ...house, numberFloors: action.numberFloors, color: action.color }
          : house
      );
    case SET_HOUSES:
      return action.houses;
    default:
      return state;
  }
};
