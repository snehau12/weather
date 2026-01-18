import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ForecastCard = ({ day, condition, max, min, icon = require('../assets/images/cloud.png') }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.condition}>{condition}</Text>
      </View>

      <View style={styles.right}>
            <View style={styles.tempColumn}>
          <Text style={styles.max}>{max}°</Text>
          <Text style={styles.min}>{min}°</Text>
        </View>
        <Image source={icon} style={styles.icon} />
    
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EFE6FF',
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  day: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'ProductSans',
  },
  condition: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: 'ProductSans',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempColumn: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  max: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'ProductSans',
        color: '#000',

  },
  min: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'ProductSans',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default ForecastCard;
