import { api } from "./api";

export const getSnacks = () => api.get("/snacks");
