import axios from "axios";
const baseUrl = "/api/audio";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const searchTitle = async (title) => {
  const response = await axios.get(`${baseUrl}/search/${title}`);
  console.log('searchtitle res', response.data)
  return []
  //   return response.data.Search.map((d) => {
//     return {
//       id: d.imdbID,
//       title: d.Title,
//       year: d.Year,
//     };
//   });
};

const getTitleById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  console.log('getbyid res', response.data);
  return {}
  const data = response.data;
//   return {
//     id: data.imdbID,
//     img: data.Poster,
//     filmType: data.Type,
//     title: data.Title,
//     year: data.Year,
//     director: data.Director,
//     genre: data.Genre.split(", "),
//   };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, searchTitle, getTitleById };
