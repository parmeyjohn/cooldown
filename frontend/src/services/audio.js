import axios from "../axiosConfig";
const baseUrl = "/api/audio";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const searchTitle = async (title) => {
  const response = await axios.get(`${baseUrl}/search/${title}`);
  console.log("searchtitle res", response.data);
  const albums = response.data.albums.items.map((album) => {
    return {
      id: album.id,
      title: album.name,
      year: album.release_date.slice(0, 4),
      artists: album.artists.map((a) => a.name),
    };
  });
  return albums;
};

const getTitleById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  console.log("getbyid res", response.data);
  const data = response.data;
  return {
    id: data.id,
    img: data.images && data.images.length > 0 ? data.images[0].url : "",
    audioType: data.album_type,
    title: data.name,
    year: data.release_date ? data.release_date.slice(0, 4) : "",
    director: data.Director,
    genre: "",
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, searchTitle, getTitleById };
