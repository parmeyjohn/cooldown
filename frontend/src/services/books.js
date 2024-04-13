import axios from "axios";
const baseUrl = "/api/books";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data.games.map((g) => {
    return { title: g.title, id: g.game_id };
  });
};

const searchTitle = async (title) => {
  const response = await axios.get(`${baseUrl}/search/${title}`);
  console.log(response.data);
  return response.data.items.map((b) => {
    return {
      title: b.volumeInfo.title,
      id: b.id,
      year: b.volumeInfo.publishedDate.slice(0, 4),
    };
  });
};

const getTitleById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  console.log(response.data);
  const data = response.data;
  return {
    img: data.volumeInfo.imageLinks.medium,
    thumbnailImg: data.volumeInfo.imageLinks.thumbnail,
    id: data.id,
    title: data.volumeInfo.title,
    pageCount: data.volumeInfo.printedPageCount,
    author: data.volumeInfo,
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, searchTitle, getTitleById };
