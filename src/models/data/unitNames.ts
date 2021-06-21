import { Knex } from "knex";
import db from "../../db";
import { Filter } from ".";

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
    .whereNot("unit_name", "LIKE", "Udefinerte%")
    .where("context", filter!.context ?? "")
    .where("year", ">", 2016)
    .modify(withFilter, filter);

function withFilter(builder: Knex.QueryBuilder, filter?: Filter) {
  if (filter?.register && filter?.register !== "all") {
    builder.whereIn("ind_id", function (this: Knex.QueryBuilder) {
      this.select("ind.id")
        .from("ind")
        .modify(registerFilter, filter.register ?? "");
    });
  }
  if (filter?.type) {
    if (filter.type === "dg") {
      builder.whereIn("type", ["dg", "dg_andel"]);
    }
    if (filter.type === "ind") {
      builder.whereNotIn("type", ["dg", "dg_andel"]);
    }
  }
}

function registerFilter(builder: Knex.QueryBuilder, registerName: string) {
  builder.where("registry_id", function (this: Knex.QueryBuilder) {
    this.select("id").from("registry").where("name", registerName);
  });
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
