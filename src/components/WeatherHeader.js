import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

const WeatherHeader = ({
  city,
  date,
  temp,
  feelsLike,
  condition,
  dayTemp,
  nightTemp,
}) => {
  return (
    <ImageBackground
      source={require('../assets/images/headerpic.png')}
      style={styles.container}
      imageStyle={styles.image}
    >
      {/* Top Row */}
      <View style={styles.topRow}>
        <Text style={styles.city}>{city}</Text>
        <TouchableOpacity>
          <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Middle Content */}
      <View style={styles.middle}>
        <View>
          <Text style={styles.temp}>{temp}°</Text>
          <Text style={styles.feelsLike}>Feels like {feelsLike}°</Text>
        </View>

        <View style={styles.conditionWrap}>
          {/* <Image source={require('../assets/images/rainy.png')} style={styles.weatherIcon} /> */}
          <Text style={styles.condition}>{condition}</Text>
        </View>
      </View>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <Text style={styles.date}>{date}</Text>

        <View style={styles.dayNight}>
          <Text style={styles.day}>Day {dayTemp}°</Text>
          <Text style={styles.night}>Night {nightTemp}°</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 380,
    borderRadius: 28,
    padding: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 28,
  },

  /* Top */
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  city: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },

  /* Middle */
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temp: {
    fontSize: 88,
    color: '#FFF',
    fontWeight: '600',
  },
  feelsLike: {
    color: '#EEE',
    fontSize: 16,
    marginTop: -10,
  },
  conditionWrap: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: 70,
    height: 70,
  },
  condition: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 6,
  },

  /* Bottom */
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  date: {
    color: '#FFF',
    fontSize: 16,
  },
  dayNight: {
    alignItems: 'flex-end',
  },
  day: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  night: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 4,
  },
});

export default WeatherHeader;
