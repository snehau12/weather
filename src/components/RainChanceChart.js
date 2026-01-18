import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RainChanceBar = ({ time, percentage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barForeground, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.percentage}>{percentage}%</Text>
    </View>
  );
};

const RainChanceChart = ({ data }) => {
  const chartData = data && data.length > 0 ? data : [];

  return (
    <View style={{ marginVertical: 20, padding: 15,marginHorizontal:15, borderRadius: 20, backgroundColor: '#D0BCFF4D' }}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/rainy.png')} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Chance of Rain</Text>
      </View>
      {chartData.map((item, index) => (
        <RainChanceBar key={index} time={item.time} percentage={item.percentage} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  time: { width: 50, fontSize: 12, color: '#7D7D7D' },
  barBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#E0D6F7',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  barForeground: {
    height: 10,
    backgroundColor: '#664FCC',
    borderRadius: 5,
  },
  percentage: { width: 30, fontSize: 12, color: '#7D7D7D' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  headerTitle: { fontWeight: '600', color: 'black', fontSize: 16, fontFamily: 'ProductSans' },
});

export default RainChanceChart;
