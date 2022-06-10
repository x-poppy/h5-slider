import React, { ReactNode, useContext } from "react";
import { SliderSchema } from "../types/Schema";

const SliderSchemaContext = React.createContext({} as SliderSchema);

interface SliderSchemaProviderProps {
  sliderSchema: SliderSchema;
  children?: ReactNode
}
export function SliderSchemaProvider(props: SliderSchemaProviderProps) {
  return (
    <SliderSchemaContext.Provider value={props.sliderSchema}>
      { props.children }
    </SliderSchemaContext.Provider>
  );
}

export function useSliderSchema() {
  return useContext(SliderSchemaContext);
}