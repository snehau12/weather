import { useState, useEffect } from 'react';

export const useDailyForecast = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyWeather = async () => {
      try {
        // Using Berlin coordinates (52.52, 13.41) to match previous examples
        // Requesting daily max/min temps and weathercode
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto'
        );
        const result = await response.json();

        if (result.daily) {
          const formattedData = result.daily.time.map((time, index) => {
            const date = new Date(time);
            // Format date: "Thursday, Jan 19"
            const options = { weekday: 'long', month: 'short', day: 'numeric' };
            const dayString = index === 0 ? 'Today' : date.toLocaleDateString('en-US', options);

            return {
              id: String(index),
              day: dayString,
              condition: getWeatherCondition(result.daily.weathercode[index]),
              max: Math.round(result.daily.temperature_2m_max[index]),
              min: Math.round(result.daily.temperature_2m_min[index]),
            };
          });
          setData(formattedData);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching daily forecast:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchDailyWeather();
  }, []);

  return { data, loading, error };
};

// Helper to map WMO weather codes to text
const getWeatherCondition = (code) => {
  if (code === 0) return 'Clear';
  if (code >= 1 && code <= 3) return 'Partly Cloudy';
  if (code >= 45 && code <= 48) return 'Fog';
  if (code >= 51 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Cloudy';
};