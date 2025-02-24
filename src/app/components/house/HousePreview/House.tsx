import { useState, memo } from "react";
import { Button } from "@/app/ui/common/button";
import {
  ConfirmDialog,
  DialogClose,
  DialogTitle,
} from "@/app/ui/common/Dialog";
import { Floor as FloorType, House as HoseType } from "@/types/house";
import { PaintBrushIcon, XMarkIcon } from "@heroicons/react/24/outline";
import isEqual from "lodash/isEqual";

interface HouseProps {
  house: HoseType;
  handleUpdateColorFloor: (
    id: string,
    color: string,
    floorIndex: number
  ) => void;
}

const Window: React.FC = () => (
  <div className="w-8 h-10 bg-white border-[1px] border-black" />
);

const Floor: React.FC<{
  color: string;
  onShowDialog: () => void;
}> = ({ color, onShowDialog }) => (
  <div
    className="relative group focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500"
    role="floor-region"
    aria-label={`Floor with color ${color}`}
    tabIndex={0}
  >
    <div className="flex justify-around p-2" style={{ backgroundColor: color }}>
      <Window />
      <Window />
    </div>
    <Button
      className="absolute top-0 right-[-16px] rounded-full p-1.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
      aria-label="Adjust color"
      onClick={onShowDialog}
    >
      <PaintBrushIcon className="h-3 w-3" />
    </Button>
  </div>
);

const Door: React.FC = () => (
  <div className="w-8 h-12 bg-white border-2 border-black self-end mt-4" />
);

const FirstFloor: React.FC<{
  color: string;
  onShowDialog: () => void;
}> = ({ color, onShowDialog }) => (
  <div
    className="relative group focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500"
    role="floor-region"
    aria-label={`Floor with color ${color}`}
    tabIndex={0}
  >
    <div
      className="flex justify-around pt-2 px-2"
      style={{ backgroundColor: color }}
    >
      <Window />
      <Door />
    </div>
    <Button
      className="absolute top-0 right-[-16px] rounded-full p-1.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
      aria-label="Adjust color"
      onClick={onShowDialog}
    >
      <PaintBrushIcon className="h-3 w-3" />
    </Button>
  </div>
);

const Roof: React.FC = () => (
  <div className="relative">
    <div className="w-0 h-0 border-l-[65px] border-r-[65px] border-b-[65px] border-l-transparent border-r-transparent border-b-black" />
    <div className="absolute m-auto inset-0 w-0 h-0 border-l-[62px] border-r-[62px] border-b-[62px] border-l-transparent border-r-transparent border-b-white" />
  </div>
);

const areEqual = (prevProps: HouseProps, nextProps: HouseProps) => {
  return isEqual(prevProps.house, nextProps.house);
};

export const House: React.FC<HouseProps> = memo(
  ({ house, handleUpdateColorFloor }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedFloor, setSelectedFloor] = useState<FloorType>();
    const [floorIndex, setFloorIndex] = useState<number>();
    const [newColor, setNewColor] = useState<string>();

    const onShowDialog = (floor: FloorType, floorIndex: number) => {
      setShowDialog(true);
      setSelectedFloor(floor);
      setFloorIndex(floorIndex);
      setNewColor(floor.color);
    };

    const onCloseDialog = () => {
      setShowDialog(false);
      setSelectedFloor(undefined);
      setFloorIndex(undefined);
      setNewColor("");
    };

    const onUpdateFloorColor = () => {
      if (selectedFloor && floorIndex !== undefined && newColor) {
        handleUpdateColorFloor(house.id, newColor, floorIndex);
        onCloseDialog();
      }
    };

    const renderFloor = (floor: FloorType, index: number) => {
      const isLastFloor = index === house.floors.length - 1;
      return isLastFloor ? (
        <FirstFloor
          key={index}
          color={floor.color}
          onShowDialog={() => onShowDialog(floor, index)}
        />
      ) : (
        <Floor
          key={index}
          color={floor.color}
          onShowDialog={() => onShowDialog(floor, index)}
        />
      );
    };

    console.log("House render", house.name);

    return (
      <>
        <div
          key={house.id}
          className="flex flex-col self-end focus:outline-none focus:ring-2 focus:ring-blue-500"
          role="region"
          aria-label={`House with ${house.floors.length} floors`}
          tabIndex={0}
        >
          <Roof />
          <div className="flex flex-col w-[130px] border-2 border-black">
            {house.floors.map((floor, index) => renderFloor(floor, index))}
          </div>
        </div>

        <ConfirmDialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTitle>Update the color of the floor</DialogTitle>
          <DialogClose>
            <Button
              className="absolute top-2 right-2 rounded-full p-1.5"
              aria-label="Close"
              onClick={onCloseDialog}
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </DialogClose>
          <div className="flex flex-col justify-end gap-4 mt-4">
            <div className="flex items-center gap-4 flex-wrap">
              <label className="block font-semibold" htmlFor="color-input">
                Color:
              </label>
              <input
                id="color-input"
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                onClick={onUpdateFloorColor}
                className="bg-green-500 text-slate-50"
              >
                Save
              </Button>
            </div>
          </div>
        </ConfirmDialog>
      </>
    );
  },
  areEqual
);
