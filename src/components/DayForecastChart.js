import React from 'react';
import { View, Dimensions, Text, Image, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const DayForecastChart = () => {
  const screenWidth = Dimensions.get('window').width - 60;

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [-5, -2, 0, 2, 3, 0, -1], // temperature values
        color: (opacity = 1) => `rgba(102, 51, 204, ${opacity})`, // line color
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/day.png')} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Day Forecast</Text>
      </View>
      <LineChart
        data={data}
        width={screenWidth}
        height={180}
        chartConfig={{
          backgroundColor: 'transparent',
          backgroundGradientFrom: 'transparent',
          backgroundGradientTo: 'transparent',
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(102, 51, 204, ${opacity})`,
          labelColor: () => '#7D7D7D',
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#664FCC',
          },
        }}
        bezier
        style={{
          borderRadius: 20,
          paddingBottom: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#D0BCFF4D',
  },
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
  headerTitle: {
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
    fontFamily: 'ProductSans',
  },
});

export default DayForecastChart;
