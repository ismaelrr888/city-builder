import { useHouses } from "@/app/context/houses/HousesContext";
import { House } from "./House";

export const HousesPreview: React.FC = () => {
  const { houses } = useHouses();

  return (
    <div className="flex gap-8 self-end">
      {houses.map((house) => (
        <House key={house.id} house={house} />
      ))}
    </div>
  );
};
