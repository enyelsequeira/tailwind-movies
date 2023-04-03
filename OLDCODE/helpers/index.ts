import {
  TvShowsInformation,
  MovieInformation,
  TVshowsAndMovieInformation,
  UserToken,
  UserSessionId,
} from "./../types/types";
import { Images, ImagesResults } from "@/types/types";
import axios from "axios";

const fillExtraImages = Array(5).fill({
  aspect_ratio: 2,
  height: 400,
  iso_639_1: "test",
  vote_average: 3,
  vote_count: 2,
  width: 400,
  placeholder: "/images/placeholder.jpeg",
});

export const resolver = (
  images: ImagesResults
): { classes: string; allImgs: Images[] } => {
  if (images?.backdrops) {
    return {
      classes: "h-[50px] md:h-[80px]",
      allImgs: images?.backdrops.concat(fillExtraImages).slice(0, 6),
    };
  } else {
    // console.log(images?.profiles.concat(fillExtraImages).slice(0, 5));
    return {
      classes: "h-[80px] md:h-[150px]",
      allImgs: images?.profiles.concat(fillExtraImages).slice(0, 5),
    };
  }
};

export function isTvShows(data: any): data is TVshowsAndMovieInformation {
  return !!data.name;
}

export function isTvTest(data: any): data is MovieInformation {
  return (data as TvShowsInformation).title !== undefined;
}

export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
  },
});

// Login
export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get<UserToken>(
      "/authentication/token/new"
    );

    const token = data.request_token;

    if (data.success) {
      localStorage.setItem("request_token", token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}`;
    }
  } catch (error) {
    throw new Error(`Sorry data could not be fetched ${error}`);
  }
};

export const getSessionId = async () => {
  const token = localStorage.getItem("request_token");

  if (token) {
    // console.log("my token is here now", token);
    try {
      const {
        data: { session_id },
      } = await moviesApi.post<UserSessionId>("authentication/session/new", {
        request_token: token,
      });
      // console.log(session_id, "my session id");

      localStorage.setItem("session_id", session_id);

      return session_id;
    } catch (error) {
      throw new Error(`Sorry sessionId could not be fetched ${error}`);
    }
  } else {
    throw new Error("Sorry sessionId was not fetched");
  }
};
