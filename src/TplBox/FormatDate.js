// 格式化时间
const FormatDate = function (date, dateType) {

  let get_date = new Date(date);
  let months = (get_date.getMonth() + 1)>9?(get_date.getMonth() + 1):"0"+(get_date.getMonth() + 1);
  let days = get_date.getDate()>9?get_date.getDate():"0"+get_date.getDate();
  let hours = get_date.getHours()>9?get_date.getHours():"0"+get_date.getHours();
  let minutes = get_date.getMinutes()>9?get_date.getMinutes():"0"+get_date.getMinutes();
  let seconds = get_date.getSeconds()>9?get_date.getSeconds():"0"+get_date.getSeconds();

  if (dateType === "datetime") {
    return get_date.getFullYear() +"-"+ months +"-"+ days +" "+ hours +":"+ minutes +":"+ seconds
  }else if(dateType === "date"){
    return get_date.getFullYear() +"-"+ months +"-"+ days
  }
}

export default FormatDate;