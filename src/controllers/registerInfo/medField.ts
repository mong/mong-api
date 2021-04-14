import { RequestHandler } from "express";
import { medField } from "../../models/registerInfo";

export const medicalFields: RequestHandler = async (_, res) => {
  try {
    const rows = await medField();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
