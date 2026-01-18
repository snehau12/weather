import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const StatItem = ({ icon, label, value, trend, trendType }) => {
  return (
    <View style={styles.card}>
      {icon && <Image source={icon} style={styles.icon} />}
      <View style={styles.statDetails}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      {trend ? (
        <Text style={trendType === 'up' ? styles.trendUp : styles.trendDown}>
          {trendType === 'up' ? `↑ ${trend}` : `↓ ${trend}`}
        </Text>
      ) : null}
    </View>
  );
};

const StatsCard = ({ stats }) => {
  // Destructure stats without defaults to allow conditional rendering
  const { wind, rain, pressure, uv, sunrise, sunset } = stats || {};

  return (
    <View style={styles.container}>
      {wind && (
        <StatItem
          icon={require('../assets/images/air.png')}
          label="Wind speed"
          value={wind.value}
          trend={wind.trend}
          trendType={wind.trendType}
        />
      )}
      {rain && (
        <StatItem
          icon={require('../assets/images/waves.png')}
          label="Rain chance"
          value={rain.value}
          trend={rain.trend}
          trendType={rain.trendType}
        />
      )}
      {pressure && (
        <StatItem
          icon={require('../assets/images/rainy.png')}
          label="Pressure"
          value={pressure.value}
          trend={pressure.trend}
          trendType={pressure.trendType}
        />
      )}
      {uv && (
        <StatItem
          icon={require('../assets/images/light_mode.png')}
          label="UV Index"
          value={uv.value}
          trend={uv.trend}
          trendType={uv.trendType}
        />
      )}
      {sunrise && (
        <StatItem
          icon={require('../assets/images/sunrise.png')}
          label="Sunrise"
          value={sunrise.value}
          trend={sunrise.trend}
          trendType={sunrise.trendType}
        />
      )}
      {sunset && (
        <StatItem
          icon={require('../assets/images/sunset.png')}
          label="Sunset"
          value={sunset.value}
          trend={sunset.trend}
          trendType={sunset.trendType}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  card: {
    width: '48%',
    backgroundColor: '#D0BCFF4D', // light purple
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    backgroundColor:'white',
    marginRight: 8,
    borderRadius: 15,
  },
  statDetails: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1B1B',
    fontFamily: 'ProductSans',
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'ProductSans',
  },
  trendUp: {
    color: '#6FCF97', // green
    fontSize: 12,
    fontFamily: 'ProductSans',
  },
  trendDown: {
    color: '#EB5757', // red
    fontSize: 12,
    fontFamily: 'ProductSans',
  },
});

export default StatsCard;
