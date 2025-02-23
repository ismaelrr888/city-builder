import React from "react";
import HouseItem from "./HouseItem";
import { useHouses } from "@/app/context/houses/HousesContext";

export const HouseBuilder: React.FC = () => {
  const { houses, handleAddHouse } = useHouses();

  return (
    <div className="rounded shadow-md">
      <div className="bg-gray-100 rounded-t p-4 mb-4 ">
        <h2 className="font-semibold">Houses List</h2>
      </div>
      <div className="p-4">
        <ul>
          {houses.map((house) => (
            <HouseItem key={house.id} house={house} />
          ))}
        </ul>
      </div>
      <div className="bg-gray-100 rounded-b p-4 flex justify-center">
        <button onClick={handleAddHouse}>Add a new house</button>
      </div>
    </div>
  );
};

export default React.memo(HouseBuilder);
