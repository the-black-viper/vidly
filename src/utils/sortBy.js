function sortBy(key, cb) {
  if (!cb) cb = () => 0;
  if (key === "genre.name") {
    return (a, b) =>
      a.genre.name > b.genre.name
        ? 1
        : b.genre.name > a.genre.name
        ? -1
        : cb(a, b);
  }
  return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : cb(a, b));
}

function sortByDesc(key, cb) {
  if (!cb) cb = () => 0;
  if (key === "genre.name") {
    return (b, a) =>
      a.genre.name > b.genre.name
        ? 1
        : b.genre.name > a.genre.name
        ? -1
        : cb(b, a);
  }
  return (b, a) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : cb(b, a));
}

function orderBy(keys, orders) {
  let cb = () => 0;
  keys.reverse();
  orders.reverse();
  for (const [i, key] of keys.entries()) {
    const order = orders[i];
    if (order === "asc") cb = sortBy(key, cb);
    else if (order === "desc") cb = sortByDesc(key, cb);
    else throw new Error(`Unsupported order "${order}"`);
  }
  return cb;
}

export default orderBy;
