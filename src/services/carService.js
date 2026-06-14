import { api } from "@/lib/api";

const FIELDS = "*,brand.*";

const FACET_FIELDS =
  "brand.name,fuel_type,transmission,body_type,ownership,discounted_price,registration_year,km_driven";

const SORT_MAP = {
  newest: "-registration_year",
  price_asc: "discounted_price",
  price_desc: "-discounted_price",
  km_asc: "km_driven",
};

export const buildCarParams = (filters = {}, sortBy = "newest", search = "") => {
  const params = {};


  if (filters.priceRange) {
    params["filter[discounted_price][_between]"] = filters.priceRange.join(",");
  }
  if (filters.brands?.length) {
    params["filter[brand][name][_in]"] = filters.brands.join(",");
  }
  if (filters.fuelTypes?.length) {
    params["filter[fuel_type][_in]"] = filters.fuelTypes.join(",");
  }
  if (filters.transmissions?.length) {
    params["filter[transmission][_in]"] = filters.transmissions.join(",");
  }
  if (filters.bodyTypes?.length) {
    params["filter[body_type][_in]"] = filters.bodyTypes.join(",");
  }
  if (filters.ownerTypes?.length) {
    params["filter[ownership][_in]"] = filters.ownerTypes.join(",");
  }
  if (filters.registrationYears?.length === 2) {
    params["filter[registration_year][_between]"] =
      filters.registrationYears.join(",");
  }
  if (filters.kmDriven?.length === 2) {
    params["filter[km_driven][_between]"] = filters.kmDriven.join(",");
  }

  params.sort = SORT_MAP[sortBy] ?? SORT_MAP.newest;

  return params;
};

export const getCarsPaged = async ({
  filters = {},
  sortBy = "newest",
  page = 1,
  limit = 12,
  search = "",
}) => {
  const response = await api.get("/cars", {
    params: {
      "fields[]": FIELDS,
      ...buildCarParams(filters, sortBy, search),
      page,
      limit,
      meta: "filter_count",
    },
  });
  return { data: response.data.data, total: response.data.meta.filter_count };
};


export const getCarFacets = async () => {
  const response = await api.get("/cars", {
    params: { "fields[]": FACET_FIELDS },
  });
  return response.data.data;
};

export const getCars = async () => {
  const response = await api.get("/cars", {
    params: { "fields[]": FIELDS },
  });
  return response.data.data;
};

export const getCarsByIds = async (ids) => {
  const response = await api.get("/cars", {
    params: {
      "fields[]": FIELDS,
      "filter[id][_in]": ids.join(","),
    },
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