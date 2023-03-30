import table from "./table";

const isEmpty = (value) => [undefined, null, ""].includes(value);

const isObjectEmpty = (obj) =>
  Object.keys(obj).every((key) => isEmpty(obj[key]));

const isNumber = (input) => Number.isFinite(Number(input));

export { table, isObjectEmpty, isEmpty, isNumber };
