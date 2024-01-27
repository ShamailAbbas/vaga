const pubishedDate = () => {
  // Create a new Date object with the input date
  const dateObject = new Date();

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month, day, and year from the Date object
  const month = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();

  // Format the date string
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};
export default pubishedDate;
