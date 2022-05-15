import { axios } from ".";
import config from "../config.json";

export const getAllSDG = async () => {
  const data = await axios.get(`${config.base_url}/sdgs`);
  return data;
};

export const getSDGByID = async (id) => {
  const data = await axios.get(`${config.base_url}/sdgs/${id}`);

  return data;
};

export const getSubSDGSByMainSDG = async (id) => {
  const data = await axios.get(`${config.base_url}/sdgs/linked/${id}`);

  return data;
};
