const deleteNils = (obj) => {
  for (let k of Object.keys(obj)) {
    if (obj[k]) continue;
    delete obj[k];
  }
};

module.exports = {
  deleteNils,
};
