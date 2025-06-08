import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TourProps {
  id: string;
  name: string;
  image: any;
  rating: number;
  price: string;
}

interface CategoryProps {
  id: string;
  name: string;
  icon: string;
}

interface PopularTourProps extends TourProps {
  location: string;
  duration: string;
}

interface FeaturedTourComponentProps {
  tour: TourProps;
  onPress: () => void;
}

interface TourCategoryComponentProps {
  category: CategoryProps;
}

interface PopularTourComponentProps {
  tour: PopularTourProps;
  onPress: () => void;
}

// Componente para tours destacados
export const FeaturedTour: React.FC<FeaturedTourComponentProps> = ({ tour, onPress }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity style={styles.featuredContainer} onPress={onPress}>
      <Image source={tour.image} style={styles.featuredImage} />
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={toggleFavorite}
      >
        <Ionicons 
          name={isFavorite ? 'heart' : 'heart-outline'} 
          size={22} 
          color={isFavorite ? '#e74c3c' : '#fff'} 
        />
      </TouchableOpacity>
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredName}>{tour.name}</Text>
        <View style={styles.featuredDetails}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{tour.rating}</Text>
          </View>
          <Text style={styles.priceText}>COP {tour.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Componente para categorías
export const TourCategory: React.FC<TourCategoryComponentProps> = ({ category }) => {
  const getIconFamily = (iconName: string) => {
    const fontAwesomeIcons = ['umbrella-beach', 'mountain', 'city', 'coffee', 'hiking'];
    return fontAwesomeIcons.includes(iconName) ? 'FontAwesome5' : 'Ionicons';
  };

  return (
    <TouchableOpacity style={styles.categoryContainer}>
      <View style={styles.categoryIconContainer}>
        <Ionicons name="map" size={24} color="#1abc9c" />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );
};

// Componente para tours populares
export const PopularTour: React.FC<PopularTourComponentProps> = ({ tour, onPress }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity style={styles.popularContainer} onPress={onPress}>
      <Image source={tour.image} style={styles.popularImage} />
      <View style={styles.popularInfo}>
        <Text style={styles.popularName}>{tour.name}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={14} color="#1abc9c" />
          <Text style={styles.locationText}>{tour.location}</Text>
        </View>
        <View style={styles.popularDetails}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{tour.rating}</Text>
          </View>
          <Text style={styles.durationText}>{tour.duration}</Text>
          <Text style={styles.priceText}>COP {tour.price}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.popularFavoriteButton} 
        onPress={toggleFavorite}
      >
        <Ionicons 
          name={isFavorite ? 'heart' : 'heart-outline'} 
          size={22} 
          color={isFavorite ? '#e74c3c' : '#6c757d'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get('window');
const featuredWidth = width * 0.7;

const styles = StyleSheet.create({
  featuredContainer: {
    width: featuredWidth,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredInfo: {
    padding: 12,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  featuredDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#212529',
    fontWeight: '500',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1abc9c',
  },
  categoryContainer: {
    width: '18%',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(26, 188, 156, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#495057',
    textAlign: 'center',
  },
  popularContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  popularImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  popularInfo: {
    flex: 1,
    padding: 12,
  },
  popularName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 4,
  },
  popularDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationText: {
    fontSize: 12,
    color: '#6c757d',
  },
  popularFavoriteButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});