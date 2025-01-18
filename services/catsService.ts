import { ICatImage } from "@/interfaces/ICatImage";
import axios from "axios";

class CatsService {
  private baseURL = "https://api.thecatapi.com/v1";
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });
  }

  async getCats(params: { page?: number; limit?: number }) {
    const { page = 1, limit = 10 } = params;

    const response = await this.axiosInstance.get<ICatImage[]>(
      "/images/search",
      {
        params: {
          page,
          limit,
          order: "desc",
        },
      }
    );

    return response.data;
  }
}

export default new CatsService();
