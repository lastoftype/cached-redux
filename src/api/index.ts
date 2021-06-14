import axios, { AxiosInstance, AxiosResponse, AxiosStatic } from "axios";
import { camelizeKeys } from "humps";
import * as Types from "../types";

class ApiClient {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://www.swapi.tech/api",
    });

    // Axios middleware to convert all api responses to camelCase
    this.client.interceptors.response.use((response: AxiosResponse) => {
      if (
        response.data &&
        response.headers["content-type"] === "application/json"
      ) {
        response.data = camelizeKeys(response.data);
      }
      return response;
    });
  }

  get(...args: Parameters<AxiosStatic["get"]>) {
    return this.client.get(...args);
  }

  /**
   * Returns list of people results
   */
  getPeople(
    params: { page?: number; limit?: number } = {}
  ): Promise<AxiosResponse<Types.Result>> {
    const DEFAULT_PARAMS = {
      limit: 10,
    };
    return this.get("/people", {
      params: {
        ...DEFAULT_PARAMS,
        ...params,
      },
    });
  }
}

const Api = new ApiClient();

export default Api;
