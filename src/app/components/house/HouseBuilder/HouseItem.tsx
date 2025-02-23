import React from "react";
import { House } from "@/types/house";
import { useHouses } from "@/app/context/houses/HousesContext";
import { Button } from "@/app/ui/common/button";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
import { NumberFloors } from "./NumberFloors";

interface HouseItemProps {
  house: House;
  handleOpenConfirmDialog: (id: string) => void;
}

const HouseItem: React.FC<HouseItemProps> = ({
  house,
  handleOpenConfirmDialog,
}) => {
  const { handleUpdateHouse, handleAddHouse } = useHouses();
  const { numberFloors, color, id } = house;

  return (
    <li>
      <div>
        <h2 className="text-xl font-bold mb-4">{"House -"}</h2>

        <NumberFloors house={house} />

        <label className="block mb-2 font-semibold">Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => handleUpdateHouse(id, numberFloors, e.target.value)}
        />

        <div className="flex gap-2 mt-4">
          <Button onClick={() => handleAddHouse({ numberFloors, color })}>
            <DocumentDuplicateIcon className="w-5" />
          </Button>
          <Button onClick={() => handleOpenConfirmDialog(id)}>
            <TrashIcon className="w-5" />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default React.memo(HouseItem);
