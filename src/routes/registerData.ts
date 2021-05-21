import express, { Request, Response } from "express";
import {
  descriptionController,
  indicatorsContoller,
  unitNamesContoller,
} from "../controllers/registerData";

const Router = express.Router();

//per reg: inicator beskrivelse, query-type: dg/ind
Router.get("/:register/descriptions", descriptionController);

//indicator veridier per enhet(en, flere eller ingen), unit level, per år, enheter (alle per år),
Router.get("/:register/indicators", indicatorsContoller);

//reg all-all eller per register
Router.get("/:register/unit_names", unitNamesContoller);

export default Router;