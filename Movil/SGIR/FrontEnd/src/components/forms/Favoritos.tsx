import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Offer } from '../../types/navigation';

type WishlistScreenRouteProp = RouteProp<RootStackParamList, 'Wishlist'>;
type WishlistScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Wishlist'>;

interface WishlistScreenProps {
  route: WishlistScreenRouteProp;
  navigation: WishlistScreenNavigationProp;
}

const WishlistScreen: React.FC<WishlistScreenProps> = ({ route, navigation }) => {
  const { wishlist = [] } = route.params || {};
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  };

  const openOfferDetails = (offer: Offer) => {
    setSelectedOffer(offer);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOffer(null);
  };

  const renderWishlistItem = ({ item }: { item: Offer }) => (
    <TouchableOpacity 
      style={styles.wishlistItem}
      onPress={() => openOfferDetails(item)}
    >
      <Image source={{ uri: item.image }} style={styles.wishlistImage} />
      <View style={styles.wishlistDetails}>
        <Text style={styles.wishlistTitle}>{item.title}</Text>
        <Text style={styles.wishlistDestination}>{item.destination}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.wishlistPrice}>{formatPrice(item.price)}</Text>
          <Text style={styles.originalPrice}>
            {formatPrice(item.price / (1 - item.discount/100))}
          </Text>
        </View>
      </View>
      <MaterialIcons 
        name="favorite" 
        size={24} 
        color="#FF5A5F" 
        style={styles.favoriteIcon}
      />
    </TouchableOpacity>
  );

  const renderDetailsModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {selectedOffer && (
            <ScrollView>
              <Image 
                source={{ uri: selectedOffer.image }} 
                style={styles.detailImage}
              />
              
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}
              >
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
              
              <View style={styles.detailContent}>
                <View style={styles.detailHeader}>
                  <Text style={styles.detailTitle}>{selectedOffer.title}</Text>
                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={18} color="#FFD700" />
                    <Text style={styles.detailRating}>{selectedOffer.rating}</Text>
                  </View>
                </View>
                
                <View style={styles.locationContainer}>
                  <Ionicons name="location-sharp" size={18} color="#4CAF50" />
                  <Text style={styles.detailDestination}>{selectedOffer.destination}</Text>
                </View>
                
                <Text style={styles.detailDescription}>{selectedOffer.description}</Text>
                
                <View style={styles.priceContainer}>
                  <Text style={styles.detailPrice}>{formatPrice(selectedOffer.price)}</Text>
                  <Text style={styles.detailOriginalPrice}>
                    {formatPrice(selectedOffer.price / (1 - selectedOffer.discount/100))}
                  </Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>{selectedOffer.discount}% OFF</Text>
                  </View>
                </View>
                
                <Text style={styles.sectionTitle}>Duración</Text>
                <Text style={styles.sectionText}>{selectedOffer.duration}</Text>
                
                <Text style={styles.sectionTitle}>Incluye</Text>
                {selectedOffer.includes.map((item, index) => (
                  <View key={index} style={styles.includedItem}>
                    <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                    <Text style={styles.includedText}>{item}</Text>
                  </View>
                ))}
                
                <Text style={styles.sectionTitle}>Lugares destacados</Text>
                <View style={styles.highlightsContainer}>
                  {selectedOffer.highlights.map((highlight, index) => (
                    <View key={index} style={styles.highlightPill}>
                      <Text style={styles.highlightText}>{highlight}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      

      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="favorite-border" size={60} color="#ccc" />
          <Text style={styles.emptyTitle}>Tu lista de deseos está vacía</Text>
          <Text style={styles.emptySubtitle}>
            Presiona el corazón en las ofertas para guardarlas aquí
          </Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text style={styles.itemCount}>
              {wishlist.length} {wishlist.length === 1 ? 'elemento' : 'elementos'}
            </Text>
          }
        />
      )}
      
      {renderDetailsModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  wishlistItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  wishlistImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  wishlistDetails: {
    flex: 1,
    marginLeft: 16,
  },
  wishlistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  wishlistDestination: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishlistPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  favoriteIcon: {
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 8,
  },
  itemCount: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#666',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    padding: 5,
  },
  detailContent: {
    paddingHorizontal: 8,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailDestination: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  detailDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    lineHeight: 20,
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  detailOriginalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  discountBadge: {
    backgroundColor: '#FF5A5F',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 10,
  },
  discountBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  includedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  includedText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  highlightPill: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 12,
    color: '#1976D2',
  },
});

export default WishlistScreen;