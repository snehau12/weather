import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import ForecastCard from '../components/ForecastCard';
import { WEATHER_API_URL } from '../constants/url';

const TABS = ['Today', 'Tomorrow', '10 days'];

const Days = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('10 days');
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState({ temp: '--', feelsLike: '--' });

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const params =
          '?latitude=50.45&longitude=30.52' +
          '&current=temperature_2m,apparent_temperature' +
          '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode' +
          '&timezone=auto';

        const response = await fetch(`${WEATHER_API_URL}${params}`);
        const data = await response.json();
        console.log('10-day forecast:', data);

        if (data.current) {
          setCurrentWeather({
            temp: Math.round(data.current.temperature_2m),
            feelsLike: Math.round(data.current.apparent_temperature),
          });
        }

        // Map API response to our DATA structure
        const dailyForecasts = data.daily.time.map((date, index) => ({
          id: index.toString(),
          day: date, // e.g., "2026-01-18"
          condition: mapWeatherCodeToText(data.daily.weathercode[index]),
          max: Math.round(data.daily.temperature_2m_max[index]),
          min: Math.round(data.daily.temperature_2m_min[index]),
          rainChance: data.daily.precipitation_probability_max[index] || 0,
        }));

        setForecastData(dailyForecasts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching 10-day forecast:', error);
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === 'Today') {
      navigation.navigate('HomeScreen');
    }
  };

  // Optional: map Open-Meteo weathercode to readable text
  const mapWeatherCodeToText = (code) => {
    const codes = {
      0: 'Clear Sky',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing Rime Fog',
      51: 'Drizzle Light',
      53: 'Drizzle Moderate',
      55: 'Drizzle Dense',
      61: 'Rain Slight',
      63: 'Rain Moderate',
      65: 'Rain Heavy',
      71: 'Snow Slight',
      73: 'Snow Moderate',
      75: 'Snow Heavy',
      80: 'Rain Showers Slight',
      81: 'Rain Showers Moderate',
      82: 'Rain Showers Violent',
      // Add more if needed
    };
    return codes[code] || 'Unknown';
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#664FCC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        location="Kharkiv, Ukraine"
        temp={currentWeather.temp}
        feelsLike={currentWeather.feelsLike}
        tabs={TABS}
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
      />

      <FlatList
        data={forecastData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ForecastCard
            day={item.day}
            condition={item.condition}
            max={item.max}
            min={item.min}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1FF',
    paddingTop: 10,
  },
});

export default Days;
