export type RootStackParamList = {
    Explore: undefined;
    Wishlist: { wishlist: Offer[] };
    // ... otras pantallas si las tienes
  };
  
  export type ExploreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Explore'>;
  export type WishlistScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Wishlist'>;
  
  export interface Offer {
    id: string;
    title: string;
    destination: string;
    price: number;
    discount: number;
    image: string;
    isFavorite: boolean;
    description: string;
    rating: number;
    includes: string[];
    duration: string;
    highlights: string[];
  }