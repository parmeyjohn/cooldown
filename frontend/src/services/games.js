import axios from "axios";
const baseUrl = "/api/games";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data.games;
};

const getTitle = async (title) => {
  const response = await axios.get(`${baseUrl}/${title}`);
  return response.data.games;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getTitle };
