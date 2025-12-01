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

export interface ICity {
  id: number;
  name_ru: string;
  name_en: string;
}

export interface IFormValues {
  city_name: string;
  city_id: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}
