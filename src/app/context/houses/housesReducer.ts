import { House } from "@/types/house";

export const ADD_HOUSE = "ADD_HOUSE";
export const UPDATE_HOUSE = "UPDATE_HOUSE";
export const SET_HOUSES = "SET_HOUSES";
export const DELETE_HOUSE = "DELETE_HOUSE";

type Action =
  | { type: typeof ADD_HOUSE; house: House }
  | {
      type: typeof UPDATE_HOUSE;
      id: string;
      numberFloors: number;
      color: string;
    }
  | { type: typeof SET_HOUSES; houses: House[] }
  | { type: typeof DELETE_HOUSE; id: string };

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
    case DELETE_HOUSE:
      return state.filter((house) => house.id !== action.id);
    default:
      return state;
  }
};
