import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabSelector = ({ tabs, selectedTab, onSelect }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, selectedTab === tab && styles.selectedTab]}
          onPress={() => onSelect(tab)}
        >
          <Text style={[styles.tabText, selectedTab === tab && styles.selectedText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginHorizontal: 15, marginVertical: 10 },
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedTab: { backgroundColor: '#8C6CF1' },
  tabText: { color: '#333', fontWeight: '500', fontFamily: 'ProductSans' },
  selectedText: { color: '#FFF' },
});

export default TabSelector;
