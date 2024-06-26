import axios from 'axios';

const API_KEY = 'C9tsDlL6CeDBsnnzIf1QgvLu8gxdbMcO';
const API_URL = 'https://api.tomorrow.io/v4/timelines';

export const getForecastWeather = async (latitude, longitude, location) => {
  let response;
  try {
    // If location is not provided, use latitude and longitude
    if (!location) {
      response = await axios.get(`${API_URL}?apikey=${API_KEY}&location=${latitude},${longitude}&fields=temperatureAvg,temperatureMin,temperatureMax,sunriseTime,sunsetTime&units=metric&timesteps=1d`);
    } 
    // If location is provided, use location
    else {
      response = await axios.get(`${API_URL}?apikey=${API_KEY}&location=${location}&fields=temperatureAvg,temperatureMin,temperatureMax,sunriseTime,sunsetTime&units=metric&timesteps=1d`);
    }

    // Extract forecast data
    const dailyForecasts = response.data?.data?.timelines?.[0]?.intervals || [];

    // Extract relevant forecast data
    const forecastData = dailyForecasts.map((forecast) => {
      // Extract date and day name
      const date = new Date(forecast.startTime);
      const dayName = getDayName(date.getDay());
      return {
        date: date.toISOString().split('T')[0], // Extract date
        dayName: dayName,
        sunriseTime: new Date(forecast.values.sunriseTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Extract time
        sunsetTime: new Date(forecast.values.sunsetTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Extract time
        temperatureAvg: forecast.values.temperatureAvg,
        temperatureMin: forecast.values.temperatureMin,
        temperatureMax: forecast.values.temperatureMax
      };
    });
    return forecastData;
  } catch (error) {
    throw new Error('Failed to fetch forecast weather data');
  }
};

// Function to get day name from the day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const getDayName = (dayIndex) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[dayIndex];
};

