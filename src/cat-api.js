import axios from "axios";

const API_KEY = "live_sNQliNngUj9jCE2QYIQbQWPAojGtqdY4vs9p3anBX2AYYGPfNQn80SvhkJDijBPS";

axios.defaults.headers.common["x-api-key"] = API_KEY;

export async function fetchBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch breeds");
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0];
  } catch (error) {
    throw new Error("Failed to fetch cat by breed");
  }
}
