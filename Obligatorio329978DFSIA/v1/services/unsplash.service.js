import axios from "axios";

export const obtenerImagenPerfume = async (nombrePerfume, marca) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query: `${nombrePerfume}+${marca} perfume bottle`,
      per_page: 1,
    },
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  });

  const resultado = response.data.results[0];

  return response.data.results[0]?.urls?.regular || null;
};
