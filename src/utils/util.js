import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";

dayjs.extend(duration);
dayjs.extend(utc);

const hashString = (str) => {
  let hash = 2166136261;

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);

    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

export const Util = {
  // [min, max)
  getSeededRandomFromDate: (gameMode, date, min, max) => {
    const seed = `${gameMode}:${date.format("YYYY:MM:DD")}`;
    const hash = hashString(seed);
    const random = hash / 2 ** 32;
    return Math.floor(random * (max - min)) + min;
  },
  getToday: () => {
    return dayjs().utc().add(5, "hour").startOf("day");
  },
  getYesterday: () => {
    return dayjs().utc().add(5, "hour").add(-1, "day").startOf("day");
  },
};
