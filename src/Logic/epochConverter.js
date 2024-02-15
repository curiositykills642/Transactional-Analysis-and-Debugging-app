// date + time >> epooch

export function getEpochTime(dateString, timeString) {
  // Combine the date and time strings into an ISO 8601 format string
  let isoString = dateString + "T" + timeString + ":00"+ "+05:30";
  
  // Create a new Date object from the ISO 8601 format string
  let date = new Date(isoString);  
  // Calculate the epoch timestamp in seconds
  let epochTime = Math.floor(date.getTime());
  
  return epochTime;
}


