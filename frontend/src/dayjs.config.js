const dayjs = require("dayjs");
var localizedFormat = require("dayjs/plugin/localizedFormat");
var utc = require("dayjs/plugin/utc");
var relativeTime = require("dayjs/plugin/relativeTime");
var updateLocale = require("dayjs/plugin/updateLocale");
var isToday = require("dayjs/plugin/isToday");

dayjs.extend(localizedFormat);
dayjs.extend(utc);
var config = {
  thresholds: [
    { l: "dd", r: 29, d: "day" },
    { l: "M", r: 1 },
    { l: "MM", r: 11, d: "month" },
    { l: "y", r: 1 },
    { l: "yy", d: "year" },
  ],
};
dayjs.extend(relativeTime, config);
dayjs.extend(updateLocale);
dayjs.extend(isToday);

export default dayjs;
