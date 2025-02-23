import { useHouses } from "@/app/context/houses/HousesContext";
import { Slider } from "@/app/ui/common/Slider";
import { House } from "@/types/house";

interface NumberFloorsProps {
  house: House;
}

const MIN = 1;
const MAX = 30;

export const NumberFloors: React.FC<NumberFloorsProps> = ({
  house: { numberFloors, color, id },
}) => {
  const { handleUpdateHouse } = useHouses();

  return (
    <div>
      <label className="block mb-2 font-semibold">Floors:</label>
      <input
        type="number"
        name="floors"
        value={numberFloors}
        max={MAX}
        min={MIN}
        onChange={(e) => handleUpdateHouse(id, parseInt(e.target.value), color)}
        className="block w-full px-3 py-2 mb-4 border rounded"
      />
      <Slider
        max={MAX}
        min={MIN}
        value={[numberFloors]}
        onValueChange={(value) => {
          const [numberFloors] = value;
          handleUpdateHouse(id, numberFloors, color);
        }}
      />
    </div>
  );
};
