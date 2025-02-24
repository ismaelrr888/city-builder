import { House } from "@/types/house";

export const ADD_HOUSE = "ADD_HOUSE";
export const UPDATE_HOUSE = "UPDATE_HOUSE";
export const SET_HOUSES = "SET_HOUSES";
export const DELETE_HOUSE = "DELETE_HOUSE";
export const UPDATE_COLOR_HOUSE = "UPDATE_COLOR_HOUSE";
export const DUPLICATE_HOUSE = "DUPLICATE_HOUSE";
export const UPDATE_COLOR_FLOOR = "UPDATE_COLOR_FLOOR";
export const UPDATE_NAME_HOUSE = "UPDATE_NAME_HOUSE";

type Action =
  | { type: typeof ADD_HOUSE; house: House }
  | {
      type: typeof UPDATE_HOUSE;
      id: string;
      numberFloors: number;
      color: string;
    }
  | { type: typeof SET_HOUSES; houses: House[] }
  | { type: typeof DELETE_HOUSE; id: string }
  | { type: typeof UPDATE_COLOR_HOUSE; id: string; color: string }
  | { type: typeof UPDATE_NAME_HOUSE; id: string; name: string }
  | { type: typeof DUPLICATE_HOUSE; house: House }
  | {
      type: typeof UPDATE_COLOR_FLOOR;
      id: string;
      color: string;
      indexFloor: number;
    };

export const initialState: House[] = [];

const buildNewHouse = (
  house: House,
  numberFloors: number,
  color: string
): House => {
  const previousNumberFloor = house?.floors.length || 0;

  if (previousNumberFloor < numberFloors) {
    const floors = [
      ...Array.from({ length: numberFloors - previousNumberFloor }, () => ({
        color,
      })),
      ...house.floors,
    ];

    return {
      ...house,
      floors,
    };
  }

  return {
    ...house,
    floors: house.floors.slice(house.floors.length - numberFloors),
  };
};

export const reducer = (state: House[], action: Action): House[] => {
  switch (action.type) {
    case ADD_HOUSE:
      return [...state, action.house];
    case UPDATE_HOUSE:
      return state.map((house) => {
        return house.id === action.id
          ? buildNewHouse(house, action.numberFloors, action.color)
          : house;
      });
    case UPDATE_COLOR_HOUSE:
      return state.map((house) =>
        house.id === action.id ? { ...house, color: action.color } : house
      );
    case UPDATE_NAME_HOUSE:
      return state.map((house) =>
        house.id === action.id ? { ...house, name: action.name } : house
      );
    case DUPLICATE_HOUSE:
      return [...state, action.house];
    case SET_HOUSES:
      return action.houses;
    case DELETE_HOUSE:
      return state.filter((house) => house.id !== action.id);
    case UPDATE_COLOR_FLOOR:
      return state.map((house) => {
        if (house.id === action.id) {
          return {
            ...house,
            floors: house.floors.map((floor, index) =>
              index === action.indexFloor ? { color: action.color } : floor
            ),
          };
        } else {
          return house;
        }
      });
    default:
      return state;
  }
};
