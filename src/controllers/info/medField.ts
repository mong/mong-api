import { RequestHandler } from "express";
import { medField } from "../../models/info";

export const medicalFields: RequestHandler = async (_, res) => {
  try {
    const rows = await medField();
    res.json(rows);
  } catch (err) {
    const typed_err = err as any;
    res.status(500).json({ message: typed_err.message });
  }
};
