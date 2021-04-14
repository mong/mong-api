export * from "./unitNames";
export * from "./indicators";
export * from "./description";

export interface Filter {
  unit_level?: string;
  year?: number;
  unit_name?: string[];
  register?: string;
  type?: string;
}
