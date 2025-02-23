"use client";

import { HousesProvider } from "./context/houses/HousesContext";
import { HouseBuilder } from "./components/house/HouseBuilder";
import { HousesPreview } from "./components/house/HousesPreview";

export default function Home() {
  return (
    <>
      <main>
        <HousesProvider>
          <div className="grid grid-cols-2 gap-2 p-4">
            <HouseBuilder />
            <HousesPreview />
          </div>
        </HousesProvider>
      </main>
    </>
  );
}
