const shortenDatesInArray = (arrayOfDates) => {
  const newDates = arrayOfDates.map(function(el) {
    return el.date_created.toDateString();
  });
  return newDates;
};



module.exports = {
  shortenDatesInArray
};
