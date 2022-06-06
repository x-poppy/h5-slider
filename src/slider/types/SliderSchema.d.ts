interface WidgetSchema<T1 extends string = string, T2 extends string = string> {
  type: T1,
  props?: Record<string, any>,
  definitions?: SchemaDefinition
  children: WidgetSchema<T2> | SliderMetadata<T2>[] | string | number | null | undefined
}

export interface SchemaDefinition {
  LocaleMessages?: Record<string, string | number | null | undefined>
  Permissions?: Record<string>
  [key: string]: SchemaDefinition | WidgetSchema | null | string | number | undefined
}

export interface SliderSchema extends WidgetSchema<'Slider', 'Slide'> {
  version: string;
  title: string;
  sideEffects?: WidgetSchema<'SideEffect'> | SliderMetadata<'SideEffect'>[]
}

export interface SlideSchema extends WidgetSchema<'Slide'> {
  sideEffects?: WidgetSchema<'SideEffect'> | SliderMetadata<'SideEffect'>[]
}

