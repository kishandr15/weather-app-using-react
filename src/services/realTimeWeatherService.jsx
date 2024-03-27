import axios from 'axios';

const API_KEY = 'C9tsDlL6CeDBsnnzIf1QgvLu8gxdbMcO';
const API_URL = 'https://api.tomorrow.io/v4/weather/realtime';

export const getRealTimeWeather = async (latitude, longitude, location) => {
  let response;
  try {
    // If location is not provided, use latitude and longitude
    if(!location) {
      response = await axios.get(`${API_URL}?apikey=${API_KEY}&location=${latitude},${longitude}`);
    }
    // If location is provided, use location
    else {
      response = await axios.get(`${API_URL}?apikey=${API_KEY}&location=${location}`);
    }
    return response.data; 
  } 
  catch (error) {
    throw new Error('Failed to fetch real-time weather data');
  }
};





