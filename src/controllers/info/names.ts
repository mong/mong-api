import { RequestHandler } from "express";
import { registerNamesModel } from "../../models/info";

export const registerNames: RequestHandler = async (req, res) => {
  try {
    const rows = await registerNamesModel();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
