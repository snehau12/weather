import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HourlyForecast = ({ data }) => (
  <FlatList
    data={data}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.time}
    contentContainerStyle={{ paddingHorizontal: 15 }}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.temp}>{item.temp}</Text>
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 100,
    // backgroundColor: '#D0BCFF4D',
    borderRadius: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  time: { fontSize: 12, color: '#333', fontFamily: 'ProductSans' },
  icon: { fontSize: 20 },
  temp: { fontSize: 14, fontWeight: '600', color: '#000', fontFamily: 'ProductSans' },
});

export default HourlyForecast;
