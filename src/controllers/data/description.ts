import { RequestHandler, Request } from "express";
import { descriptionModel, Filter } from "../../models/data";

export const descriptionController: RequestHandler = async (req, res) => {
  try {
    const register: string = req.params.register;
    const query = parseQuery(req);
    const rows = await descriptionModel(register, query.filter);
    res.json(rows);
  } catch (err) {
    const typed_err = err as any;
    res.status(500).json({ message: typed_err.message });
  }
};

interface Query {
  filter?: Filter;
}

function parseQuery(req: Request): Query {
  const query: Query = {};

  if (typeof req.query === "object" && !Array.isArray(req.query)) {
    query.filter = {};

    if (typeof req.query.type === "string") {
      query.filter.type = req.query.type;
    }
  }
  return query;
}
