import moment from "moment";

export const formatDateYear = (date) => {
  return moment(new Date(date)).format(`YYYY`);
};

export const formatDateFullDate = (date) => {
  return moment(new Date(date)).format(`DD MMMM YYYY`);
};

export const formatDuration = (durationMinutes) => {
  return moment.unix(durationMinutes * 60).utc().format(`H[h] mm[m]`);
};

export const formatDateHumanReadable = (date) => {
  return moment(date, `YYYY-MM-DDTHH:mm:ss.SSS-3`).fromNow();
};

// ПЕРЕЙТИ НА DAYJS
