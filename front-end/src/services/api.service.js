import axios from "axios";
import { API } from "../config/config";
const headers = { "Content-Type": "application/json" };
export const getData = async () => {
  const url = `${API}/get-data`;
  try {
    const response = await axios.get(url, {
      headers: headers,
      raxConfig: {
        retry: 3,
        retryDelay: 3500,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("🚀 ~ file: api.service.js ~ line 12 ~ getData ~ err", err);
  }
};
