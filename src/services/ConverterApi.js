import axios from "axios";

const BASE_URL = "https://api.navasan.tech/latest";
const API_KEY = "freeVH8A6SXMwcANWJ77GlHGjLF9GWT9";

const getUsdRate = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`, {
      params: { api_key: API_KEY },
      timeout: 5000, 
    });
    return response.data?.usd_buy?.value || null;
  } catch (error) {
    console.error("Error fetching USD rate:", error.message);
    return null;
  }
};

export {getUsdRate}

