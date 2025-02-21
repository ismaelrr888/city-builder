import React from "react";

interface HouseListProps {
  houses: unknown[];
}

export const HouseList: React.FC<HouseListProps> = ({ houses }) => {
  return (
    <div>
      <h2>Houses</h2>
      <ul>
        {/* {houses.map((house) => (
          <li key={house.id}>
            {house.name} - {house.address}
          </li>
        ))} */}
      </ul>
    </div>
  );
};
