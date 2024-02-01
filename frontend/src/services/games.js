import axios from "axios";
const baseUrl = "/api/games";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data.games.map((g) => {
    return { title: g.title, id: g.game_id };
  });
};

const searchTitle = async (title) => {
  const response = await axios.get(`${baseUrl}/search/${title}`);
  return response.data.games.map((g) => {
    return { title: g.title, id: g.game_id };
  });
};

const getTitleById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const data = response.data.games[0];
  console.log(data);
  return {
    img: data.sample_cover.image,
    thumbnailImg: data.sample_cover.thumbnail_image,
    id: data.game_id,
    title: data.title,
    genres: [data.genres.map((i) => i.genre_name)],
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, searchTitle, getTitleById };
