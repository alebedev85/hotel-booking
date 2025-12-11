import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IHotel } from "@/types";

export const hotelsApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getHotelsByCity: builder.query<{ hotels: IHotel[] }, number>({
      query: (city_id) => `hotels?city_id=${city_id}`,
    }),
  }),
});

export const { useGetHotelsByCityQuery } = hotelsApi;