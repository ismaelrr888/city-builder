import React from "react";
import { House } from "@/types/house";
import { Button } from "@/app/ui/common/button";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
import { NumberFloors } from "./NumberFloors";
import { useHouses } from "@/app/context/houses/HousesContext";

interface HouseItemProps {
  house: House;
  handleOpenConfirmDialog: (id: string) => void;
}

const HouseItem: React.FC<HouseItemProps> = ({
  house,
  handleOpenConfirmDialog,
}) => {
  const {
    handleUpdateColorHouse,
    handleDuplicateHouse,
    handleUpdateNameHouse,
  } = useHouses();
  const { id, color, name } = house;

  return (
    <div role="item-region">
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor={`name-input-${id}`} className="text-xl font-bold">
          House -
        </label>
        <input
          id={`name-input-${id}`}
          type="text"
          value={name}
          onChange={(e) => handleUpdateNameHouse(id, e.target.value)}
          aria-labelledby={`color-input-${id}`}
          className="block px-3 py-2 border rounded"
        />
      </div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <NumberFloors house={house} />

          <label htmlFor={`color-input-${id}`} className="block font-semibold">
            Color:
          </label>
          <input
            id={`color-input-${id}`}
            type="color"
            value={color}
            onChange={(e) => handleUpdateColorHouse(id, e.target.value)}
            aria-labelledby={`color-input-${id}`}
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => handleDuplicateHouse(house)}
            aria-label="Duplicate house"
          >
            <DocumentDuplicateIcon className="w-5" />
          </Button>
          <Button
            onClick={() => handleOpenConfirmDialog(id)}
            aria-label="Delete house"
          >
            <TrashIcon className="w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HouseItem);
