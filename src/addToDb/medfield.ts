export interface MedFieldInterface {
  shortName: string;
  name: string;
  registers: string[];
}

export const medField: MedFieldInterface[] = [
  {
    shortName: "hjerte",
    name: "Hjerte- og karsykdommer",
    registers: [
      "ablanor",
      "noric",
      "hjerteinfarkt",
      "hjerneslag",
      "hjertestans",
      "hjertesvikt",
      "hjertekirurgi",
      "norkar",
    ],
  },
  {
    shortName: "kreft",
    name: "Kreft",
    registers: [
      "barnekreft",
      "brystkreft",
      "gynkreft",
      "lungekreft",
      "lymfoid",
      "melanom",
      "prostata",
      "tarmkreft_colon",
      "tarmkreft_rectum",
    ],
  },
  {
    shortName: "luft",
    name: "Luftveier",
    registers: ["mek_vent"],
  },
  {
    shortName: "diabetes",
    name: "Diabetes",
    registers: ["barnediabetes", "diabetes_voksne"],
  },
  {
    shortName: "nerve",
    name: "Nervesystemet",
    registers: ["cp", "ms", "parkinson", "norkog"],
  },
  {
    shortName: "muskel",
    name: "Muskel og skjelett",
    registers: [
      "barnehofte",
      "hoftebrudd",
      "korsband",
      "ryggkir",
      "leddprotese",
      "nnrr",
      "muskel",
      "nkr_nakke",
      "nkr_rygg",
    ],
  },
  {
    shortName: "tarm",
    name: "Mage og tarm",
    registers: [
      "gastronet",
      "fedmekir",
      "nra",
      "norgast",
      "tarmkreft_colon",
      "tarmkreft_rectum",
    ],
  },
  {
    shortName: "gyn",
    name: "Gynekologi",
    registers: ["nger", "nkir"],
  },
  {
    shortName: "nyre",
    name: "Nyre",
    registers: ["nyre"],
  },
  {
    shortName: "intensiv",
    name: "Skade og intensiv",
    registers: ["traume", "intensiv", "nnk"],
  },
  {
    shortName: "rehab",
    name: "Rehabilitering",
    registers: ["nnrr", "norscir"],
  },
  {
    shortName: "onh",
    name: "Øre-nese-hals",
    registers: ["tonsille"],
  } /*,
  {  
    shortName: "hud",
    name: "Hudsykdommer",
    registers: ["hisreg"]
  },*/,
  {
    shortName: "psyk",
    name: "Psykisk helse og rus",
    registers: ["kvarus", "norspis"],
  },
  /*  {
    shortName: "autoimmun",
    name: "Autoimmune sykdommer",
    registers: ["roas", "norvas"],
  },*/
  /*  {
    shortName: "revma",
    name: "Revmatologi",
    registers: ["norartritt", "norvas"],
  }*/ {
    shortName: "barn",
    name: "Barn",
    registers: [
      "cp",
      "barnehofte",
      "barnekreft",
      "barnediabetes",
      "lkg",
      "nnk",
    ],
  },
  {
    shortName: "annet",
    name: "Andre",
    registers: ["smerte", "porfyri"],
  },
];
