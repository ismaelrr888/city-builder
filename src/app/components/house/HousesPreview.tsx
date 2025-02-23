import { useHouses } from "@/app/context/houses/HousesContext";

export const HousesPreview: React.FC = () => {
  const { houses } = useHouses();

  return (
    <div>
      {houses.map(({ numberFloors, color, id }) => (
        <div
          key={id}
          className="w-24 h-24 bg-gray-200 border border-gray-400 flex items-center justify-center"
        >
          <span className="text-center">{color}</span>,{" "}
          <span className="text-center">{numberFloors}</span>
        </div>
      ))}
    </div>
  );
};
