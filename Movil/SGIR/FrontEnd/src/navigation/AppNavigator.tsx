import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import SearchBar from '../../components/ui/SearchBar';
import DestinationCard from '../../components/ui/DestinationCard';
import PackageCard from '../../components/ui/PackageCard';
import HotelCard from '../../components/ui/HotelCard';
import TourCard from '../../components/ui/TourCard';
import SectionTitle from '../../components/ui/SectionTitle';
import { fetchFeaturedDestinations, fetchPopularPackages, fetchTopHotels, fetchFeaturedTours } from '../../services/api';
import { Destination, Package, Hotel, Tour } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [destData, packData, hotelData, tourData] = await Promise.all([
          fetchFeaturedDestinations(),
          fetchPopularPackages(),
          fetchTopHotels(),
          fetchFeaturedTours(),
        ]);
        
        setDestinations(destData);
        setPackages(packData);
        setHotels(hotelData);
        setTours(tourData);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>¡Bienvenido!</Text>
            <Text style={styles.subtitle}>Descubre lo mejor de Colombia</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Icon name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <SearchBar placeholder="Buscar destinos, hoteles, tours..." />

        <SectionTitle title="Destinos Destacados" onSeeAll={() => navigation.navigate('Destinations')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </ScrollView>

        <SectionTitle title="Paquetes Populares" onSeeAll={() => navigation.navigate('Packages')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          {packages.map((pkg) => (
            <PackageCard 
              key={pkg.id} 
              package={pkg} 
              onPress={() => navigation.navigate('PackageDetail', { id: pkg.id })}
            />
          ))}
        </ScrollView>

        <SectionTitle title="Hoteles Destacados" onSeeAll={() => navigation.navigate('Hotels')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          {hotels.map((hotel) => (
            <HotelCard 
              key={hotel.id} 
              hotel={hotel} 
              onPress={() => navigation.navigate('HotelDetail', { id: hotel.id })}
            />
          ))}
        </ScrollView>

        <SectionTitle title="Tours Recomendados" onSeeAll={() => navigation.navigate('Tours')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          {tours.map((tour) => (
            <TourCard 
              key={tour.id} 
              tour={tour} 
              onPress={() => navigation.navigate('TourDetail', { id: tour.id })}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
});