import { RequestHandler } from "express";
import { medField } from "../../models/info";

export const medicalFields: RequestHandler = async (_, res) => {
  try {
    const rows = await medField();
    const emptyArray: {shortName?: string,
    name?: string,
    registers?: string[]}[] = []

    const testvalue = rows.reduce((prevVal, currVal) => {
      const returnValue = prevVal.some(val => val.shortName === currVal.shortName) ?
      prevVal.filter(val => val.shortName === currVal.shortName).map(val => val.registers?.push(currVal.registers)) : 
      [...prevVal, {
        shortName: currVal.shortName,
        name: currVal.name,
        registers: [currVal.registers],
      }];
      return returnValue;
    }, emptyArray);

    res.json(testvalue);
  } catch (err) {
    const typed_err = err as any;
    res.status(500).json({ message: typed_err.message });
  }
};
