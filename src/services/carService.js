import { api } from "@/lib/api";

const FIELDS = "*,brand.*";

export const getCars = async () => {
  const response = await api.get("/cars", {
    params: { "fields[]": FIELDS },
  });
  return response.data.data;
};

export const getCarById = async (id) => {
  const response = await api.get("/cars", {
    params: {
      "fields[]": FIELDS,
      "filter[id][_eq]": id,
    },
  });
  return response.data.data[0];
};