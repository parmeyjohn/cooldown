import axios from "../axiosConfig";
const baseUrl = "/api/login";

let token = null;

const login = async (credentials) => {
  console.log("in login");
  const res = await axios.post(baseUrl, credentials);
  console.log("login res", res);
  return res.data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export default { login, setToken };
