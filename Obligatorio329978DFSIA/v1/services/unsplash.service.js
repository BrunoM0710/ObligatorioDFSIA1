import axios from "axios";

export const obtenerImagenPerfume = async (nombre, marca) => {
  try {
    if (!nombre || !marca) return null;

    const query = `${marca} ${nombre} perfume bottle`;
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        per_page: 1,
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    return response.data.results[0]?.urls?.small || null;
  } catch (error) {
    console.error("Unsplash ERROR:", error.response?.data || error.message);
    return null;
  }
};
