import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { House } from "@/types/house";
import {
  reducer,
  initialState,
  ADD_HOUSE,
  UPDATE_HOUSE,
  SET_HOUSES,
  DELETE_HOUSE,
} from "./housesReducer";

interface HousesContextProps {
  houses: House[];
  handleAddHouse: () => void;
  handleUpdateHouse: (id: string, numberFloors: number, color: string) => void;
  handleDeleteHouse: (id: string) => void;
  onSerialize: () => void;
  onDeserialize: () => void;
}

const HousesContext = createContext<HousesContextProps | undefined>(undefined);

export const HousesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [houses, dispatch] = useReducer(reducer, initialState);

  const handleAddHouse = () => {
    const house = { id: uuidv4(), numberFloors: 3, color: "red" };
    dispatch({ type: ADD_HOUSE, house });
  };

  const handleUpdateHouse = useCallback(
    (id: string, numberFloors: number, color: string) => {
      dispatch({ type: UPDATE_HOUSE, id, numberFloors, color });
    },
    []
  );

  const handleDeleteHouse = useCallback((id: string) => {
    dispatch({ type: DELETE_HOUSE, id });
  }, []);

  const onSerialize = () => {
    localStorage.setItem("houses", JSON.stringify(houses));
  };

  const onDeserialize = () => {
    const storedHouses = localStorage.getItem("houses");
    if (storedHouses) {
      dispatch({ type: SET_HOUSES, houses: JSON.parse(storedHouses) });
    }
  };

  return (
    <HousesContext.Provider
      value={{
        houses,
        handleAddHouse,
        handleUpdateHouse,
        onSerialize,
        onDeserialize,
        handleDeleteHouse,
      }}
    >
      {children}
    </HousesContext.Provider>
  );
};

export const useHouses = () => {
  const context = useContext(HousesContext);
  if (!context) {
    throw new Error("useHouses must be used within a HousesProvider");
  }
  return context;
};
