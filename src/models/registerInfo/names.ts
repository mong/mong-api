import db from "../../db";

export interface RegisterName {
  id: number;
  rname: string;
  full_name: string;
}

export const registerNamesModel = (): Promise<RegisterName[]> =>
  db.select("id", "name as rname", "full_name").from("registry");
