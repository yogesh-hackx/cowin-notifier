const axios = require('axios');

const fetchData = async (pincode, date) => {
  let centers = [];
  try {
    const { data } = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`);
    centers = data.centers;
  } catch (error) {
    console.log(error);
  }
  return centers;
};

module.exports = fetchData;
