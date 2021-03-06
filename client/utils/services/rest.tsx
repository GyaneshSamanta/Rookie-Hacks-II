import axios, { AxiosInstance } from "axios";

export const rest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
