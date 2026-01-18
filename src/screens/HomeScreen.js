import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image } from 'react-native';
import WeatherHeader from '../components/WeatherHeader';
import Header from '../components/Header';
import TabSelector from '../components/TabSelector';
import HourlyForecast from '../components/HourlyForecast';
import StatsCard from '../components/StatsCard';
import DayForecastChart from '../components/DayForecastChart';
import RainChanceChart from '../components/RainChanceChart';
import { WEATHER_API_URL } from '../constants/url';

const HomeScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Weekly Forecast');
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [hourlyData, setHourlyData] = useState([]);
  const [currentStats, setCurrentStats] = useState(null);
  const [currentTemp, setCurrentTemp] = useState('--');
  const [rainChanceData, setRainChanceData] = useState([]);
  const [sunStats, setSunStats] = useState(null);
  const [weatherHeaderData, setWeatherHeaderData] = useState({
    city: 'San Francisco', date: '--', temp: '--', feelsLike: '--', condition: '--', dayTemp: '--', nightTemp: '--'
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const params = '?latitude=37.7749&longitude=-122.4194&current=temperature_2m,wind_speed_10m,apparent_temperature,weathercode&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto';
        const response = await fetch(
          `${WEATHER_API_URL}${params}`
        );
        const data = await response.json();
console.log('Fetched weather data:', data);
        // Update Current Temp
        setCurrentTemp(Math.round(data.current.temperature_2m));

        // Update Weather Header Data
        const date = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'short' };
        setWeatherHeaderData({
          city: 'Kharkive Ukraine',
          date: date.toLocaleDateString('en-US', options),
          temp: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          condition: mapWeatherCodeToText(data.current.weathercode),
          dayTemp: Math.round(data.daily.temperature_2m_max[0]),
          nightTemp: Math.round(data.daily.temperature_2m_min[0]),
        });

        // Update Hourly Data
        // Find the index of the current hour in the hourly arrays using string matching
        const currentHourISO = data.current.time.slice(0, 13) + ':00';
        const nowIndex = data.hourly.time.indexOf(currentHourISO);
        const startIndex = nowIndex >= 0 ? nowIndex : 0;

        const nextHours = data.hourly.time.slice(startIndex, startIndex + 5);
        const nextTemps = data.hourly.temperature_2m.slice(startIndex, startIndex + 5);

        const mappedHourly = nextHours.map((time, index) => {
          // Parse hour directly from string "2026-01-18T14:00" -> 14
          const hour = parseInt(time.split('T')[1].split(':')[0], 10);
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const hourLabel = `${hour % 12 || 12} ${ampm}`;
          return {
            time: hourLabel,
            icon: '☁️', // Default icon as API URL doesn't include weather_code
            temp: `${Math.round(nextTemps[index])}°`,
          };
        });
        setHourlyData(mappedHourly);

        // Update Rain Chance Data (Next 4 hours)
        const nextRainProbs = (data.hourly.precipitation_probability || []).slice(startIndex, startIndex + 4);
        const mappedRain = nextRainProbs.map((prob, index) => {
          // Reuse time calculation logic
          const timeStr = data.hourly.time[startIndex + index];
          const hour = parseInt(timeStr.split('T')[1].split(':')[0], 10);
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const hourLabel = `${hour % 12 || 12} ${ampm}`;
          return { time: hourLabel, percentage: prob };
        });
        setRainChanceData(mappedRain);

        // Get current rain chance
        const currentRainChance = (data.hourly.precipitation_probability || [])[startIndex] || 0;

        // Update Stats
        setCurrentStats({
          wind: { value: `${data.current.wind_speed_10m} km/h`, trend: '2', trendType: 'down' },
          rain: { value: `${currentRainChance}%`, trend: '10%', trendType: 'up' },
          pressure: { value: '1013 hpa', trend: '32', trendType: 'up' },
          uv: { value: '2.3', trend: '0.3', trendType: 'down' },
        });

        // Update Sun Stats (Sunrise/Sunset)
        if (data.daily && data.daily.sunrise && data.daily.sunset) {
          const formatTime = (iso) => {
            const time = iso.split('T')[1];
            const [h, m] = time.split(':');
            const hour = parseInt(h, 10);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12;
            return `${hour12}:${m} ${ampm}`;
          };
          setSunStats({
            sunrise: { value: formatTime(data.daily.sunrise[0]) },
            sunset: { value: formatTime(data.daily.sunset[0]) },
          });
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const mapWeatherCodeToText = (code) => {
    const codes = {
      0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing Rime Fog', 51: 'Drizzle Light', 53: 'Drizzle Moderate',
      55: 'Drizzle Dense', 61: 'Rain Slight', 63: 'Rain Moderate', 65: 'Rain Heavy',
      71: 'Snow Slight', 73: 'Snow Moderate', 75: 'Snow Heavy', 80: 'Rain Showers Slight',
      81: 'Rain Showers Moderate', 82: 'Rain Showers Violent', 95: 'Thunderstorm',
    };
    return codes[code] || 'Unknown';
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === '10 day') {
      navigation.navigate('Days');
    }
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Show sticky header when scrolled down past 300px
    setShowStickyHeader(scrollY > 300);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showStickyHeader && (
        <View style={styles.stickyHeader}>
          <Header
            location="Karkhiv Ukhrain"
            temp={currentTemp}
            feelsLike={-2}
            tabs={['Today', 'Tomarrow', '10 day']}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <WeatherHeader
          city={weatherHeaderData.city}
          date={weatherHeaderData.date}
          temp={weatherHeaderData.temp}
          feelsLike={weatherHeaderData.feelsLike}
          condition={weatherHeaderData.condition}
          dayTemp={weatherHeaderData.dayTemp}
          nightTemp={weatherHeaderData.nightTemp}
        />

        <TabSelector
          tabs={['Today', 'Tomarrow','10 day']}
          selectedTab={selectedTab}
          onSelect={handleTabChange}
        />
        <View style={styles.statsContainer}>
          <StatsCard stats={currentStats} />
        </View>
        <View style={styles.hourlyContainer}>
          <View style={styles.hourlyHeader}>
            <Image source={require('../assets/images/clock.png')} style={styles.clockIcon} />
            <Text style={styles.hourlyTitle}>Hourly Forecast</Text>
          </View>
          <HourlyForecast data={hourlyData} />
        </View>
        <DayForecastChart />
        <RainChanceChart data={rainChanceData} />
        <StatsCard stats={sunStats} />


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6EDFF' },
  scrollContent: { paddingBottom: 20 },
  statsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  hourlyContainer: {
    backgroundColor: '#D0BCFF4D',
    borderRadius: 20,
    padding: 10,
    paddingVertical:10,
    marginHorizontal: 15,
  },
  hourlyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    // backgroundColor:'#D0BCFF4D',
  },
  clockIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  hourlyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'ProductSans',
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    
  },
});

export default HomeScreen;