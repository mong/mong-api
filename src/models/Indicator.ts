import { Knex } from "knex";
import db from "../db";

export interface Filter {
  unit_level?: string;
}

export interface Indicator {
  ind_id: string;
  unit_level: string;
  unit_name: string;
  orgnr: number;
  year: number;
  denominator: number;
  var: number;
  level: string;
  level_direction: number | null;
  dg?: number;
  include: number | null;
}

export const all = (filter?: Filter): Promise<Indicator[]> =>
  db
    .select("agg_data.*", "ind.id", "ind.include", "ind.type")
    .from("agg_data")
    .leftJoin("ind", "agg_data.ind_id", "ind.id")
    .where("include", 1)
    .where("context", "caregiver")
    .whereNotIn("type", ["dg", "dg_andel"])
    .modify(withFilter, filter);

function withFilter(builder: Knex.QueryBuilder, filter?: Filter) {
  if (filter?.unit_level) {
    builder.andWhere("unit_level", filter.unit_level);
  }
}
