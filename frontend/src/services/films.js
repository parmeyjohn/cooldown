import axios from "axios";
const baseUrl = "https://cooldown-node-backend.fly.dev/api/films";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const searchTitle = async (title) => {
  const response = await axios.get(`${baseUrl}/search/${title}`);
  return response.data.Search.map((d) => {
    return {
      id: d.imdbID,
      title: d.Title,
      year: d.Year,
    };
  });
};

const getTitleById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  console.log(response);
  const data = response.data;
  return {
    id: data.imdbID,
    img: data.Poster,
    filmType: data.Type,
    title: data.Title,
    year: data.Year,
    director: data.Director,
    genre: data.Genre.split(", "),
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, searchTitle, getTitleById };
