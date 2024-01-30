import axios from "axios";
const baseUrl = "/api/films";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getTitle = async (title) => {
  const response = await axios.get(`${baseUrl}/${title}`);
  return response.data.Search;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getTitle };
