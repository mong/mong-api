import { RequestHandler, Request } from "express";
import {
  distinctUnitNamesRegister,
  unitNamesAllLevels,
  Filter,
} from "../../models/registerData";
import { createOptsTu, nestTuNames } from "../../helpers/functions";

interface Query {
  filter?: Filter;
}

export const unitNamesContoller: RequestHandler = async (req, res) => {
  const query = parseQuery(req);

  try {
    const distinctUnitNames = await distinctUnitNamesRegister(query.filter);
    const allUnitNames = await unitNamesAllLevels();
    const opts_tu = createOptsTu(distinctUnitNames, allUnitNames);
    const nestedUnitNames = nestTuNames(allUnitNames, opts_tu);

    const rows = {
      opts_tu,
      nestedUnitNames,
    };
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

function parseQuery(req: Request): Query {
  const query: Query = {};

  if (typeof req.query === "object" && !Array.isArray(req.query)) {
    query.filter = {};
    query.filter.register = req.params.register;
  }

  return query;
}
