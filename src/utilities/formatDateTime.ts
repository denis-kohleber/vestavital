export const formatDateTime = (timestamp: string): string => {
  const now = new Date();
  let date = now;
  if (timestamp) date = new Date(timestamp);

  const months = date.getMonth();
  const days = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const DD = days < 10 ? `0${days}` : days;
  const YYYY = date.getFullYear();
  const HH = hours < 10 ? `0${hours}` : hours;
  const MinMin = minutes < 10 ? `0${minutes}` : minutes;

  let monthName = "";
  switch (months) {
    case 0: monthName = "Januar"; break;
    case 1: monthName = "Februar"; break;
    case 2: monthName = "März"; break;
    case 3: monthName = "April"; break;
    case 4: monthName = "Mai"; break;
    case 5: monthName = "Juni"; break;
    case 6: monthName = "Juli"; break;
    case 7: monthName = "August"; break;
    case 8: monthName = "September"; break;
    case 9: monthName = "Oktober"; break;
    case 10: monthName = "November"; break;
    case 11: monthName = "Dezember"; break;
    default: monthName = ""; 
  }

  return `${DD}. ${monthName} ${YYYY} · ${HH}:${MinMin}`;
};