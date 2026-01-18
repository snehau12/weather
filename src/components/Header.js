import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TabSelector from './TabSelector';

const Header = ({
  location,
  temp,
  feelsLike,
  tabs,
  selectedTab,
  onTabChange,
}) => {
  return (
    <View style={styles.container}>
      {/* Top row */}
      <View style={styles.topRow}>
        <Text style={styles.location}>{location}</Text>
        <TouchableOpacity>
          <Text style={styles.search}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Temperature + cloud */}
      <View style={styles.tempRow}>
        <View>
          <Text style={styles.temperature}>{temp}°</Text>
          <Text style={styles.feelsLike}>Feels like {feelsLike}</Text>
        </View>

        <Image
          source={require('../assets/images/cloud.png')} // <-- your cloud image
          style={styles.cloud}
          resizeMode="contain"
        />
      </View>

      {/* Tabs INSIDE header */}
      <TabSelector
        tabs={tabs}
        selectedTab={selectedTab}
        onSelect={onTabChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#E1D3FA',
    paddingBottom: 10,
    marginBottom: 10,
  },
  topRow: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111', // darker like image
    fontFamily: 'ProductSans',
    paddingTop: 25,
  },
  search: {
    fontSize: 18,
  },
  tempRow: {
    marginHorizontal: 15,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 48,
    fontWeight: '700',
    color: '#111',
    fontFamily: 'ProductSans',
  },
  feelsLike: {
    fontSize: 14,
    color: '#444',
    fontFamily: 'ProductSans',
  },
  cloud: {
    width: 70,
    height: 70,
  },
});

export default Header;
