import React from "react";
import { House } from "@/types/house";
import { Button } from "@/app/ui/common/button";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
import { NumberFloors } from "./NumberFloors";
import isEqual from "lodash/isEqual";

interface HouseItemProps {
  house: House;
  handleOpenConfirmDialog: (id: string) => void;
  handleUpdateColorHouse: (id: string, color: string) => void;
  handleDuplicateHouse: (house: House) => void;
  handleUpdateNameHouse: (id: string, name: string) => void;
}

const HouseItem: React.FC<HouseItemProps> = ({
  house,
  handleOpenConfirmDialog,
  handleUpdateColorHouse,
  handleDuplicateHouse,
  handleUpdateNameHouse,
}) => {
  const { id, color, name } = house;

  return (
    <div role="item-region">
      <div className="flex items-center gap-2 mb-4 flex-wrap">
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

const areEqual = (prevProps: HouseItemProps, nextProps: HouseItemProps) => {
  return isEqual(prevProps.house, nextProps.house);
};

export default React.memo(HouseItem, areEqual);
