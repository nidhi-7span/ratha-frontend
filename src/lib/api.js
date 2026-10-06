import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://directus-8b8q.onrender.com/items",
});