import { Knex } from "knex";
import db from "../../db";
import { Filter } from "../registerData";

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

export const indicatorsModel = (filter?: Filter): Promise<Indicator[]> =>
  db
    .select("agg_data.*", "ind.type", "ind.include")
    .from("agg_data")
    .leftJoin("ind", "agg_data.ind_id", "ind.id")
    .where("include", 1)
    .modify(withFilter, filter);

function withFilter(builder: Knex.QueryBuilder, filter?: Filter) {
  if (filter?.unit_level) {
    builder.andWhere("unit_level", filter.unit_level);
  }
  if (filter?.year && typeof filter?.year === "number") {
    builder.where("year", filter.year);
  }
  if (filter?.unit_name) {
    builder.whereIn("unit_name", filter.unit_name);
  }
  if (filter?.register) {
    builder.whereIn("ind_id", function (this: any) {
      this.select("ind.id")
        .from("ind")
        .where("registry_id", function (this: any) {
          this.select("id").from("registry").where("name", filter.register);
        });
    });
  }
}