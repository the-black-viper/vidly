const Paginate = (movieArray, startIndex = 0, qty = 1) => {
  return [...movieArray].splice(startIndex, qty);
};

export default Paginate;
