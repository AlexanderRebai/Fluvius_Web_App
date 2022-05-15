import { axios } from ".";
import config from "../config.json";

export const login = async (username, password) => {
  const { data } = await axios.post(`${config.base_url}/users/login`, {
    username,
    password,
  });
  //console.log(data);
  return data;
};

export const getUserById = async (id) => {
  const { data } = await axios.get(`${config.base_url}/users/${id}`);

  return data;
};

export const getUserByName = async (username) => {
  const { data } = await axios.get(`${config.base_url}/users/name/${username}`);
  return data;
};

//eid
export const loginE_id = async (idnumber, password) => {
  const { data } = await axios.post(`${config.base_url}/users/logineid`, {
    idnumber,
    password,
  });

  return data;
};

export const getUserByIdNumber = async (idnumber) => {
  const { data } = await axios.get(`${config.base_url}/users/eid/${idnumber}`);
  return data;
};
