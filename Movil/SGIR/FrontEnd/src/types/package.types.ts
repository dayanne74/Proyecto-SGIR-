export interface TourPackage {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: {
      days: number;
      nights: number;
    };
    locations: string[];
    images: string[];
    includes: string[];
    excludes: string[];
    itinerary: {
      day: number;
      description: string;
      activities: string[];
    }[];
    available: boolean;
  }
  
  export interface PackageBooking {
    id?: string;
    packageId: string;
    userId: string;
    startDate: string;
    people: {
      adults: number;
      children: number;
    };
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt?: string;
  }