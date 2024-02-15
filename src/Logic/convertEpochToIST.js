export function convertEpochToIST(epoch) {
  const dateObj = new Date(epoch * 1000); // Convert epoch to milliseconds
  const options = {
    timeZone: "Asia/Kolkata",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Set this to false to display time in 24-hour format
  };
  const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(dateObj);

  // Replace forward slashes ("/") with dots (".")
  const dateWithDots = formattedDate.replace(/\//g, ".");

  return dateWithDots;
}
