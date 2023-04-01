const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const isEmpty = (val) => [undefined, null, ""].includes(val);

const filterData = (data, filter) =>
  data?.filter((dataObj) => {
    for (const key in filter) {
      if (
        !isEmpty(filter[key]) &&
        (dataObj[key] === undefined ||
          dataObj[key] === null ||
          !dataObj[key]
            .toString()
            .toLowerCase()
            .includes(filter[key].toString().toLowerCase()))
      ) {
        return false;
      }
    }
    return true;
  });
const table = { stableSort, getComparator, filterData, isEmpty };
export default table;
