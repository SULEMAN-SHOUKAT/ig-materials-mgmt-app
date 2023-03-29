import table from "./table";

const isEmpty = (value) => [undefined, null, ""].includes(value);

const isObjectEmpty = (obj) =>
  Object.keys(obj).every((key) => isEmpty(obj[key]));

export { table, isObjectEmpty, isEmpty };
