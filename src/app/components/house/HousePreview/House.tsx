import { useHouses } from "@/app/context/houses/HousesContext";
import { House as HoseType } from "@/types/house";

interface HouseProps {
  house: HoseType;
}

const Window: React.FC = () => (
  <div className="w-8 h-10 bg-white border-[1px] border-black" />
);

const Floor: React.FC<{
  color: string;
  onChangeColor: () => void;
}> = ({ color, onChangeColor }) => {
  return (
    <>
      <div
        className="flex justify-around p-2"
        style={{ backgroundColor: color }}
      >
        <Window />
        <Window />
      </div>
    </>
  );
};

const Door: React.FC = () => (
  <div className="w-8 h-12 bg-white border-2 border-black self-end mt-4" />
);
const FirstFloor: React.FC<{ color: string }> = ({ color }) => (
  <div
    className="flex justify-around pt-2 px-2"
    style={{ backgroundColor: color }}
  >
    <Window />
    <Door />
  </div>
);

const Roof: React.FC = () => (
  <div className="w-0 h-0 border-l-[65px] border-r-[65px] border-b-[65px] border-l-transparent border-r-transparent border-b-black" />
);

export const House: React.FC<HouseProps> = ({ house }) => {
  const { handleUpdateColorFloor } = useHouses();
  return (
    <div key={house.id} className="flex flex-col self-end">
      <Roof />

      <div className="flex flex-col w-[130px] border-2 border-black">
        {house.floors.map((floor, index) => {
          if (index === house.floors.length - 1) {
            return <FirstFloor key={index} color={floor.color} />;
          } else {
            return (
              <Floor
                key={index}
                color={floor.color}
                onChangeColor={() =>
                  handleUpdateColorFloor(house.id, "blue", index)
                }
              />
            );
          }
        })}
      </div>
    </div>
  );
};
