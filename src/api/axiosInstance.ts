import axios from "axios";

const api = axios.create({
  baseURL: "/api/auth", // базовый путь для всех запросов
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // если нужны куки
});

export default api;