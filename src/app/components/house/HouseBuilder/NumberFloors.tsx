import { useHouses } from "@/app/context/houses/HousesContext";
import { Slider } from "@/app/ui/common/Slider";
import { House } from "@/types/house";

interface NumberFloorsProps {
  house: House;
}

const MIN = process.env.NEXT_PUBLIC_MIN_FLOORS || 1;
const MAX = process.env.NEXT_PUBLIC_MAX_FLOORS || 30;

export const NumberFloors: React.FC<NumberFloorsProps> = ({
  house: { id, floors, color },
}) => {
  const { handleUpdateHouse } = useHouses();

  return (
    <div>
      <div className="flex items-center gap-2">
        <label htmlFor={`floors-input-${id}`} className="font-semibold">
          Floors:
        </label>
        <input
          id={`floors-input-${id}`}
          type="number"
          name="floors"
          value={floors.length}
          max={MAX}
          min={MIN}
          onChange={(e) =>
            handleUpdateHouse(id, parseInt(e.target.value), color)
          }
          className="block w-16 px-3 py-2 border rounded"
          aria-labelledby={`floors-input-${id}`}
        />
      </div>
      <Slider
        max={+MAX}
        min={+MIN}
        value={[floors.length]}
        onValueChange={(value) => {
          const [numberFloors] = value;
          handleUpdateHouse(id, numberFloors, color);
        }}
        aria-labelledby={`floors-slider-${id}`}
      />
    </div>
  );
};
