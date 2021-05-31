const BASE_URL = 'http://localhost:8080';

const getTime = () => {
  var today = new Date();
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return date + ' ' + time;
};

export { BASE_URL, getTime };
