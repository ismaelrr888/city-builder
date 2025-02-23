import { SliderProps } from "@radix-ui/react-slider";
import { Slider as SliderRadix } from "radix-ui";
import React from "react";

export const Slider: React.FC<SliderProps> = ({
  max,
  min,
  value,
  onValueChange,
}) => (
  <SliderRadix.Root
    className="relative flex items-center select-none touch-none w-52 h-5"
    value={value}
    max={max}
    min={min}
    onValueChange={onValueChange}
    step={1}
  >
    <SliderRadix.Track className="bg-black relative flex-grow rounded-full h-[3px]">
      <SliderRadix.Range className="absolute bg-slate-400 rounded-full h-full" />
    </SliderRadix.Track>
    <SliderRadix.Thumb
      className="block w-5 h-5 bg-slate-600 shadow-[0_2px_10px_var(--black-a7)] rounded-[10px] hover:bg-violet-3 focus:outline-none focus:shadow-[0_0_0_5px_var(--black-a8)]"
      aria-label="Volume"
    />
  </SliderRadix.Root>
);
