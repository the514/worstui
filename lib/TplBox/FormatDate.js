"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 格式化时间
var FormatDate = function FormatDate(date, dateType) {

  var get_date = new Date(date);
  var months = get_date.getMonth() + 1 > 9 ? get_date.getMonth() + 1 : "0" + (get_date.getMonth() + 1);
  var days = get_date.getDate() > 9 ? get_date.getDate() : "0" + get_date.getDate();
  var hours = get_date.getHours() > 9 ? get_date.getHours() : "0" + get_date.getHours();
  var minutes = get_date.getMinutes() > 9 ? get_date.getMinutes() : "0" + get_date.getMinutes();
  var seconds = get_date.getSeconds() > 9 ? get_date.getSeconds() : "0" + get_date.getSeconds();

  if (dateType === "datetime") {
    return get_date.getFullYear() + "-" + months + "-" + days + " " + hours + ":" + minutes + ":" + seconds;
  } else if (dateType === "date") {
    return get_date.getFullYear() + "-" + months + "-" + days;
  }
};

exports.default = FormatDate;
//# sourceMappingURL=FormatDate.js.map