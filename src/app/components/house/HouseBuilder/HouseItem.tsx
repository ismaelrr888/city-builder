import React from "react";
import { House } from "@/types/house";
import { useHouses } from "@/app/context/houses/HousesContext";
import { Button } from "@/app/ui/common/button";
import { TrashIcon } from "@heroicons/react/24/outline";

interface HouseItemProps {
  house: House;
}

const HouseItem: React.FC<HouseItemProps> = ({
  house: { numberFloors, color, id },
}) => {
  const { handleUpdateHouse, handleDeleteHouse } = useHouses();

  return (
    <li>
      <div>
        <h2 className="text-xl font-bold mb-4">{"House -"}</h2>

        <label className="block mb-2 font-semibold">Floors:</label>
        <input
          type="number"
          name="floors"
          value={numberFloors}
          onChange={(e) =>
            handleUpdateHouse(id, parseInt(e.target.value), color)
          }
          className="block w-full px-3 py-2 mb-4 border rounded"
        />

        <label className="block mb-2 font-semibold">Color:</label>
        <select
          name="color"
          value={color}
          onChange={(e) => handleUpdateHouse(id, numberFloors, e.target.value)}
          className="block w-full px-3 py-2 mb-4 border rounded"
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="orange">Orange</option>
        </select>

        <Button onClick={() => handleDeleteHouse(id)}>
          <TrashIcon className="w-5" />
        </Button>
      </div>
    </li>
  );
};

export default React.memo(HouseItem);
