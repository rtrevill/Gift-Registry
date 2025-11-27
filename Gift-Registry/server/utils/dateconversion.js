module.exports = {
    DateConversion: function(dateString) {
      const dateParts = dateString.split("-");
      // dateParts[0] is day, dateParts[1] is month, dateParts[2] is year
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
      const day = parseInt(dateParts[2], 10);
        console.log(year, month, day)
      return new Date(year, month, day);
    }

}
