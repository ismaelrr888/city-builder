"use client";

import { HousesProvider } from "./context/houses/HousesContext";
import { HouseBuilder } from "./components/house/HouseBuilder/HouseBuilder";
import { HousesPreview } from "./components/house/HousePreview/HousesPreview";

export default function Home() {
  return (
    <>
      <main>
        <HousesProvider>
          <div className="grid grid-cols-2 gap-4 p-4">
            <HouseBuilder />
            <HousesPreview />
          </div>
        </HousesProvider>
      </main>
    </>
  );
}
