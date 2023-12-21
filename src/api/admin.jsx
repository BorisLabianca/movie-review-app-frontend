import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const getAppInfo = async () => {
  try {
    const token = getToken();
    const { data } = await client.get("/admin/app-info", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getMostRatedMovie = async () => {
  try {
    const token = getToken();
    const { data } = await client.get("/admin/most-rated", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
