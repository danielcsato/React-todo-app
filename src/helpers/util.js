//gives back current time in yyyy-mm-dd hh-mm-ss format
const getTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes();
  return date + ' ' + time;
};

export { getTime };
