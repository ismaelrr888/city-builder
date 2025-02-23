import React from "react";
import HouseItem from "./HouseItem";
import { useHouses } from "@/app/context/houses/HousesContext";

export const HouseBuilder: React.FC = () => {
  const { houses, handleAddHouse } = useHouses();

  return (
    <div>
      <h2>Houses List</h2>
      <ul>
        {houses.map((house) => (
          <HouseItem key={house.id} house={house} />
        ))}
      </ul>
      <button onClick={handleAddHouse}>Add a new house</button>
    </div>
  );
};

export default React.memo(HouseBuilder);
