import { House as HoseType } from "@/types/house";

interface HouseProps {
  house: HoseType;
}

const Window: React.FC = () => (
  <div className="w-8 h-10 bg-white border-[1px] border-black" />
);

const Floor: React.FC = () => (
  <div className="flex justify-around">
    <Window />
    <Window />
  </div>
);

const Door: React.FC = () => (
  <div className="w-8 h-12 bg-white border-2 border-black self-end mt-4" />
);
const FirstFloor: React.FC = () => (
  <div className="flex justify-around">
    <Window />
    <Door />
  </div>
);

const Roof: React.FC = () => (
  <div className="w-0 h-0 border-l-[65px] border-r-[65px] border-b-[65px] border-l-transparent border-r-transparent border-b-black" />
);

export const House: React.FC<HouseProps> = ({ house }) => {
  return (
    <div key={house.id}>
      <Roof />

      <div
        className="flex flex-col w-[130px] gap-4 pt-4 px-1 border-2 border-black"
        style={{ background: house.color }}
      >
        {Array.from({ length: house.numberFloors - 1 }).map((_, index) => (
          <Floor key={index} />
        ))}

        <FirstFloor />
      </div>
    </div>
  );
};
