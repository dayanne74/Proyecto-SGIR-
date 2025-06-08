import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailsScreen = ({ route }: any) => {
  const { destination } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: destination.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{destination.name}</Text>
        <Text style={styles.subtitle}>{destination.region} • {destination.category}</Text>
        <Text style={styles.description}>{destination.details}</Text>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004d73',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: '#444',
  },
});
