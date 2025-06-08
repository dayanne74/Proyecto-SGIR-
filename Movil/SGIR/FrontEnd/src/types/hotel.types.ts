export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  stars: number;
  price: number;
  images: string[];
  amenities: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  available: boolean;
}

export interface HotelBooking {
  id?: string;
  hotelId: string;
  userId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: {
    adults: number;
    children: number;
  };
  roomType: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
}