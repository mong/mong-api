import { Knex } from "knex";
import db from "../../db";
import { Filter } from "../registerData";

export interface TuName {
  hospital: string;
  hf: string;
  hf_full: string;
  rhf: string;
}

export interface NestedTreatmentUnitName {
  rhf: string;
  hf: {
    hf: string;
    hf_full: string;
    hospital: string[];
  }[];
}

export interface OptsTu {
  label: "Sykehus" | "HF" | "RHF";
  options: {
    value: string;
    label: string;
  }[];
}

export const distinctUnitNamesRegister = (
  filter?: Filter
): Promise<{ unit_name: string }[]> =>
  db
    .distinct("agg_data.unit_name")
    .from("agg_data")
    .leftJoin("ind", "agg_data.ind_id", "ind.id")
    .where("include", 1)
    .where("year", ">", 2016)
    .modify(withFilter, filter);

function withFilter(builder: Knex.QueryBuilder, filter?: Filter) {
  if (filter?.register && filter?.register !== "all") {
    builder.whereIn("ind_id", function (this: any) {
      this.select("ind.id")
        .from("ind")
        .where("registry_id", function (this: any) {
          this.select("id").from("registry").where("name", filter.register);
        });
    });
  }
}

export const unitNamesAllLevels = (): Promise<TuName[]> =>
  db
    .distinct(
      "hospital.short_name as hospital",
      "hf.short_name as hf",
      "hf.full_name as hf_full",
      "rhf.short_name as rhf"
    )
    .from("hospital")
    .leftJoin("hf", "hospital.hf_orgnr", "hf.orgnr")
    .leftJoin("rhf", "hf.rhf_orgnr", "rhf.orgnr");
