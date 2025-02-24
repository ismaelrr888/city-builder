import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { HousesProvider } from "@/app/context/houses/HousesContext";

const AllProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <HousesProvider>{children}</HousesProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
