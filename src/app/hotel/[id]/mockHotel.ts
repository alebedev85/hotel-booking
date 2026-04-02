export const mockHotel = {
  id: "atelier-de-la-paix",
  name: "L'Atelier de la Paix",
  collection: "Grand Palace Collection",
  stars: 5,
  location: {
    address: "15 Place Vendôme, 75001 Paris, France",
    coordinates: { lat: 48.8675, lng: 2.3294 },
    nearby: [
      { name: "Лувр", distance: "4 мин. пешком" },
      { name: "Сад Тюильри", distance: "6 мин. пешком" },
      { name: "Опера Гарнье", distance: "12 мин. пешком" }
    ]
  },
  price: 840,
  currency: "€",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0A5f-Yf4ZXdQnaceU6spd4Ct0bO-GNH0djssDDecSZJydV6ZjTy6ORKd4NizSRL0sa4XzaI__VhTwzZFrCBBU8EaFsDQA6RqaXyzwMEmBbDErIyGbZ2vl70BhqOngo5tLvZetUpi1UDDPCFUM6Y2P0EANWHQgxpVRMrAjeE3EfubAkZcPS40F5xsJN4jPPF3krtrdEPm7NL116CRlIopxS0ygKDp55HsqPcu1IkEuY9KKeD4UAhq6s_LGk3cIIoup4DNDFMShFY", // Главное фото
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDSYJJs0TPCQqHJ_fWiXDORi911x-eVwb-t0aas0wSumFlZk8_8Zxk1U4ezDBt_LuPpX3FuYHHSvWHo4K7RMcwHY2Zls7cU7fKRq4p4bwyNpXsMNTIdOzGDLNuQxN8GLXocM6hxzaa4tzgjLsskkEWJHCDegD89AiJgOSGWxgsTqldrRNk1-rZnM7yJjl4MLafDftkl8tcK_C46iUrGs6ukBrThoxIqIyB-vlRa0PBuxL2H2u58LcQ-twGbKbUgq8OulD7PzBpOqog",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDEJEEhKzGZVDmkcv8Qvqk9Akm0oIn4wXIfufbOz8hK4gTZbgkRmMnWZTzmgmonl4SfHCoCD8ChFFz6YITTJ44CjGmSXDZqo0lgRa8To3nXJBPZqb8ftYFhI_hDL8s0ABcV-uZsIeDGbG0-p80AeRsbdv_57SsyIbQqS9BtW6PCtzNAnf343vMy732Uxq1OKZrIFtf60xfR-L_OSmr4DUyl9qXoqFX25TdQwG5bw6tcoxSH2-pcMl_zDztnFJx3M9vEjL1zDxyNUV8",
    "/hotels/atelier-4.jpg",
    "/hotels/atelier-5.jpg"
  ],
  amenities: [
    { icon: "wifi", label: "Ultra Fast WiFi" },
    { icon: "pool", label: "Infinity Pool" },
    { icon: "spa", label: "Vitality Spa" },
    { icon: "restaurant", label: "Michelin Dining" },
    { icon: "ac_unit", label: "Climate Control" },
    { icon: "local_bar", label: "Artisan Bar" }
  ],
  description: {
    title: "The Artistic Legacy",
    content: [
      "Занимая исторический особняк 18-го века в самом сердце 1-го округа, L'Atelier de la Paix — это больше, чем отель; это живая курация парижской высокой культуры.",
      "Каждый люкс был тщательно отреставрирован известными мастерами, сочетая оригинальные черты неоклассицизма с авангардным современным искусством."
    ]
  },
  rooms: [
    {
      id: "room-1",
      name: "Heritage Deluxe Room",
      size: "35m²",
      view: "Garden View",
      price: 840,
      image: "/hotels/room-1.jpg"
    }
  ]
};