import { axios } from ".";
import config from "../config.json";

export const getAllDoelstellingen = async () => {
  const data = await axios.get(`${config.base_url}/doelstellingen`);

  return data;
};

export const getDoelstellingByID = async (id) => {
  const data = await axios.get(`${config.base_url}/doelstellingen/${id}`);

  return data;
};
