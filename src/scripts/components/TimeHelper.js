export const timesOfDay = {
  morning: 0,
  afternoon: 1,
  evening: 2,
  night: 3,
};

export function getTimeOfDay(dateObj) {
  const date = dateObj || new Date();
  const hour = date.getHours();

  let timeOfDay = timesOfDay.evening;

  if (hour < 6 || hour > 22) {
    timeOfDay = timesOfDay.night;
  } else if (hour < 11) {
    timeOfDay = timesOfDay.morning;
  } else if (hour > 10 && hour < 18) {
    timeOfDay = timesOfDay.afternoon;
  }

  return timeOfDay;
}

export function getFormattedTime(dateObj) {
  const date = dateObj || new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }

  if (min < 10) {
    min = `0${min}`;
  }

  if (sec < 10) {
    sec = `0${sec}`;
  }

  return `${hour} ${min} ${sec}`;
}
