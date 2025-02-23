"use client";

import { HousesProvider } from "./context/houses/HousesContext";
import { HouseBuilder } from "./components/house/HouseBuilder/HouseBuilder";
import { HousesPreview } from "./components/house/HousePreview/HousesPreview";

export default function Home() {
  return (
    <>
      <main>
        <HousesProvider>
          <div className="grid md:grid-cols-[30%_1fr] sm:grid-cols-1 gap-4 p-4">
            <HouseBuilder />
            <HousesPreview />
          </div>
        </HousesProvider>
      </main>
    </>
  );
}
