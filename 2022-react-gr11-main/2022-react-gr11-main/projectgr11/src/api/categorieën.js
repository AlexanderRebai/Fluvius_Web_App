import { axios } from ".";
import config from "../config.json";

export const getAllCategories = async () => {
  const data = await axios.get(`${config.base_url}/categories`);
  return data;
};

export const getCategorieByID = async (id) => {
  const data = await axios.get(`${config.base_url}/categories/${id}`);

  return data;
};

export const getFullDataCategories = async () => {
  const data = await axios.get(
    `${config.base_url}/categories/alldata/categories`
  );

  return data;
};
