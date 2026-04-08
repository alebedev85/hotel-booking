export interface Amenity {
  icon: string;
  label: string;
  description?: string;
}

export interface NearbyPlace {
  name: string;
  distance: string;
}

export interface Room {
  id: string;
  name: string;
  size: string;
  features: string[];
  benefits: string[];
  price: number;
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  collection: string;
  stars: number;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    nearby: NearbyPlace[];
  };
  price: number;
  currency: string;
  images: string[];
  previewAmenities: Amenity[];
  detailedAmenities: Amenity[];
  description: {
    title: string;
    content: string[];
  };
  rooms: Room[];
}