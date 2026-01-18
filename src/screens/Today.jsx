import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

const hourlyData = [
    { time: "Now", temp: "72°", icon: "☀️", pop: "0%" },
    { time: "1 PM", temp: "73°", icon: "☀️", pop: "0%" },
    { time: "2 PM", temp: "74°", icon: "🌤️", pop: "10%" },
    { time: "3 PM", temp: "75°", icon: "🌤️", pop: "10%" },
    { time: "4 PM", temp: "73°", icon: "☁️", pop: "20%" },
    { time: "5 PM", temp: "71°", icon: "☁️", pop: "30%" },
    { time: "6 PM", temp: "69°", icon: "🌧️", pop: "50%" },
    { time: "7 PM", temp: "67°", icon: "🌧️", pop: "60%" },
    { time: "8 PM", temp: "65°", icon: "🌧️", pop: "60%" },
];

const detailsData = [
    { label: "Sunrise", value: "6:15 AM" },
    { label: "Sunset", value: "8:20 PM" },
    { label: "UV Index", value: "5 (Moderate)" },
    { label: "Pressure", value: "29.92 inHg" },
    { label: "Visibility", value: "10 mi" },
    { label: "Feels Like", value: "74°" },
];

const Today = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={styles.headerTitle}>Today's Details</Text>

            <View style={styles.chartContainer}>
                <Text style={styles.chartPlaceholder}>[Temperature Graph Placeholder]</Text>
            </View>

            <Text style={styles.subTitle}>Hourly Forecast</Text>
            <View style={styles.hourlyListContainer}>
                <FlatList
                    data={hourlyData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.time}
                    renderItem={({ item }) => (
                        <View style={styles.hourlyCard}>
                            <Text style={styles.hourlyTime}>{item.time}</Text>
                            <Text style={styles.hourlyIcon}>{item.icon}</Text>
                            <Text style={styles.hourlyTemp}>{item.temp}</Text>
                            <Text style={styles.hourlyPop}>💧 {item.pop}</Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                />
            </View>

            <Text style={styles.subTitle}>Current Conditions</Text>
            <View style={styles.detailsGrid}>
                {detailsData.map((detail, index) => (
                    <View key={index} style={styles.detailItem}>
                        <Text style={styles.detailLabel}>{detail.label}</Text>
                        <Text style={styles.detailValue}>{detail.value}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1B1B',
        paddingTop: 60,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 20,
        marginBottom: 15,
        marginTop: 20,
    },
    chartContainer: {
        marginHorizontal: 20,
        height: 150,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartPlaceholder: {
        color: '#666',
    },
    hourlyListContainer: {
        height: 140,
    },
    hourlyCard: {
        backgroundColor: '#2A2A2A',
        width: 80,
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,
    },
    hourlyTime: {
        color: '#AAA',
        fontSize: 12,
    },
    hourlyIcon: {
        fontSize: 24,
    },
    hourlyTemp: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    hourlyPop: {
        color: '#4DA6FF',
        fontSize: 10,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    detailItem: {
        width: '48%',
        backgroundColor: 'rgba(255,255,255,0.08)',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
    },
    detailLabel: {
        color: '#AAA',
        fontSize: 12,
        marginTop: 4,
    },
    detailValue: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Today;
