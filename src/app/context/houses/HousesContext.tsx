"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { House } from "@/types/house";
import {
  reducer,
  initialState,
  ADD_HOUSE,
  UPDATE_HOUSE,
  DELETE_HOUSE,
  SET_HOUSES,
  UPDATE_COLOR_HOUSE,
  DUPLICATE_HOUSE,
  UPDATE_COLOR_FLOOR,
} from "./housesReducer";

interface HousesContextProps {
  houses: House[];
  handleAddHouse: () => void;
  handleUpdateHouse: (id: string, numberFloors: number, color: string) => void;
  handleDeleteHouse: (id: string) => void;
  handleUpdateColorHouse: (id: string, color: string) => void;
  handleDuplicateHouse: (house: House) => void;
  handleUpdateColorFloor: (
    id: string,
    color: string,
    indexFloor: number
  ) => void;
  onSerialize: () => void;
  onDeserialize: () => void;
}

const HousesContext = createContext<HousesContextProps | undefined>(undefined);

export const HousesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [houses, dispatch] = useReducer(reducer, initialState);

  const handleAddHouse = useCallback(() => {
    dispatch({
      type: ADD_HOUSE,
      house: { id: uuidv4(), floors: [{ color: "#a65f00" }], color: "#a65f00" },
    });
  }, []);

  const handleDuplicateHouse = useCallback((house: House) => {
    dispatch({
      type: DUPLICATE_HOUSE,
      house: { ...house, id: uuidv4() },
    });
  }, []);

  const handleUpdateColorFloor = useCallback(
    (id: string, color: string, indexFloor: number) => {
      dispatch({ type: UPDATE_COLOR_FLOOR, id, color, indexFloor });
    },
    []
  );

  const handleUpdateColorHouse = useCallback((id: string, color: string) => {
    dispatch({ type: UPDATE_COLOR_HOUSE, id, color });
  }, []);

  const handleUpdateHouse = useCallback(
    (id: string, numberFloors: number, color: string) => {
      dispatch({ type: UPDATE_HOUSE, id, numberFloors, color });
    },
    []
  );

  const handleDeleteHouse = useCallback((id: string) => {
    dispatch({ type: DELETE_HOUSE, id });
  }, []);

  const onSerialize = useCallback(() => {
    localStorage.setItem("houses", JSON.stringify(houses));
  }, [houses]);

  const onDeserialize = useCallback(() => {
    const storedHouses = localStorage.getItem("houses");
    if (storedHouses) {
      dispatch({ type: SET_HOUSES, houses: JSON.parse(storedHouses) });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSerialize();
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [onSerialize]);

  useEffect(() => {
    onDeserialize();
  }, [onDeserialize]);

  return (
    <HousesContext.Provider
      value={{
        houses,
        handleAddHouse,
        handleUpdateHouse,
        onSerialize,
        onDeserialize,
        handleDeleteHouse,
        handleUpdateColorHouse,
        handleDuplicateHouse,
        handleUpdateColorFloor,
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
