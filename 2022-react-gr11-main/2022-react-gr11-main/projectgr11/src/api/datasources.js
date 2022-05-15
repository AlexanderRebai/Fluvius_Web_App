import { axios } from ".";
import config from "../config.json";

export const getAllDatasources = async () => {
  const data = await axios.get(`${config.base_url}/datasources`);

  return data;
};

export const getDatasourceByID = async (id) => {
  const data = await axios.get(`${config.base_url}/datasources/${id}`);

  return data;
};

export const getFileByName = async (name) => {
  const data = await axios.get(`${config.base_url}/datasources/file/${name}`);

  return data;
}