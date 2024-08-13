const dayjs = require("dayjs");
var localizedFormat = require("dayjs/plugin/localizedFormat");
var utc = require("dayjs/plugin/utc");
var relativeTime = require("dayjs/plugin/relativeTime");
/*TODO: Add extensions for relative time */

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(relativeTime);

export default dayjs;
