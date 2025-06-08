export interface Tour {
    id: string;
    name: string;
    description: string;
    location: string;
    price: number;
    duration: number; // In hours
    images: string[];
    includes: string[];
    excludes: string[];
    departureTime: string;
    returnTime: string;
    difficulty: 'easy' | 'moderate' | 'challenging';
    available: boolean;
  }
  
  export interface TourBooking {
    id?: string;
    tourId: string;
    userId: string;
    date: string;
    people: {
      adults: number;
      children: number;
    };
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt?: string;
  }
  