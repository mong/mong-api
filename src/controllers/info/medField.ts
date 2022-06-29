import { RequestHandler } from "express";
import { medField } from "../../models/info";

export const medicalFields: RequestHandler = async (_, res) => {
  try {
    const rows = await medField();
    const emptyArray: {
      shortName?: string;
      name?: string;
      registers?: string[];
    }[] = [];

    const testvalue = rows.reduce((prevVal, currVal) => {
      prevVal
        .filter((val) => val.shortName === currVal.shortName)
        .forEach(
          (val) =>
            (val.registers = [...(val.registers ?? []), currVal.registers])
        );
      const returnValue = prevVal.some(
        (val) => val.shortName === currVal.shortName
      )
        ? []
        : [
            {
              shortName: currVal.shortName,
              name: currVal.name,
              registers: [currVal.registers],
            },
          ];

      return [...prevVal, ...returnValue];
    }, emptyArray);

    res.json(testvalue);
  } catch (err) {
    const typed_err = err as any;
    res.status(500).json({ message: typed_err.message });
  }
};
