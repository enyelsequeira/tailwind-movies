import { useQuery } from "@tanstack/react-query";
import { getMovieAPI } from "@/services/API";
import { APIKEY } from "@/services/API";
import { Credits } from "@/types/newTypes";

export const getPersonInfo = async (personCode: number) => {
  const API = `/person/${personCode}?append_to_response=videos,credits,images&api_key=${APIKEY}`;
  const res = await getMovieAPI().get<CastType>(API);
  return res.data;
};

export const getMoviesWithPerson = async (personCode: number) => {
  const API = `/discover/movie?with_cast=${personCode}&page=1&api_key=${APIKEY}`;
  const res = await getMovieAPI().get<MovieWithCast>(API);
  const response = res.data.results.slice(0, 12);
  return response;
};

export const usePersonInfo = (personCode: number) => {
  const { data, ...methods } = useQuery({
    queryKey: ["person-info", personCode],
    queryFn: async () => getPersonInfo(personCode),
    enabled: !!personCode,
  });
  return {
    person: data,
    ...methods,
  };
};

export interface CastType {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: any;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  credits: Credits;
  images: Images;
}

export interface Images {
  profiles: Profile[];
}

export interface Profile {
  aspect_ratio: number;
  height: number;
  iso_639_1: any;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieWithCast {
  results: MovieWithCastResult[];
}

export interface MovieWithCastResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
