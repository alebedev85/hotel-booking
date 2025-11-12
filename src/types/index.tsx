export interface IHotel {
  id: string;
  name: string;
  location: {
    lat: number;
    lon: number;
    city: string;
    country: string;
  };
  facilities: string[];
  rooms: { type: string; price: number }[];
  price_from: number;
  currency: string;
  rating: number;
}
