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
} from "./housesReducer";
interface HousesContextProps {
  houses: House[];
  handleAddHouse: (params: { numberFloors?: number; color?: string }) => void;
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

  const handleAddHouse = ({
    numberFloors = 3,
    color = "#a65f00",
  }: {
    numberFloors?: number;
    color?: string;
  }) => {
    const house = { id: uuidv4(), numberFloors, color };
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

  useEffect(() => {
    const timer = setTimeout(() => {
      onSerialize();
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [houses]);

  useEffect(() => {
    onDeserialize();
  }, []);

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
