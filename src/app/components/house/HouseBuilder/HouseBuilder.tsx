import React, { useState } from "react";
import HouseItem from "./HouseItem";
import { useHouses } from "@/app/context/houses/HousesContext";
import { Button } from "@/app/ui/common/button";
import { HomeIcon } from "@heroicons/react/20/solid";
import { ConfirmDialog, DialogClose } from "@/app/ui/common/Dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const HouseBuilder: React.FC = () => {
  const { houses, handleAddHouse, handleDeleteHouse } = useHouses();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [houseId, setHouseId] = useState<string>("");

  const handleOpenConfirmDialog = (id: string) => {
    setHouseId(id);
    setShowConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
  };

  const handleDelte = () => {
    handleDeleteHouse(houseId);
    setShowConfirmDialog(false);
  };

  return (
    <div className="rounded shadow-md flex flex-col self-start md:sticky md:top-8">
      <div className="bg-gray-100 rounded-t p-4 mb-4 ">
        <h2 className="font-semibold">Houses List</h2>
      </div>
      <div className="p-4 overflow-y-auto custom-max-height">
        <ul>
          {houses.map((house) => (
            <HouseItem
              key={house.id}
              house={house}
              handleOpenConfirmDialog={handleOpenConfirmDialog}
            />
          ))}
        </ul>
      </div>
      <div className="bg-gray-100 rounded-b p-4 flex justify-center">
        <Button onClick={handleAddHouse}>
          <HomeIcon className="w-5" />
          Build a new house
        </Button>
        <ConfirmDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
        >
          <DialogTitle>Are you sure you want to delete this house?</DialogTitle>
          <DialogClose>
            <Button
              className="absolute top-2 right-2 rounded-full p-1.5"
              aria-label="Close"
              onClick={handleCloseConfirmDialog}
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </DialogClose>
          <div className="flex justify-end gap-4 mt-4">
            <Button className="bg-red-500 text-slate-50" onClick={handleDelte}>
              Delete
            </Button>
          </div>
        </ConfirmDialog>
      </div>
    </div>
  );
};

export default React.memo(HouseBuilder);
