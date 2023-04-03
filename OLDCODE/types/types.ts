export interface GenresData {
  id: number;
  name: string;
}

export interface Genres {
  genres: GenresData[];
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genres_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Shows extends Movie {
  first_air_date: string;
  name: string;
  media_type: string;
  origin_country: string;
  original_name: string;
  poster_path: string;
}

export type SingleResults = Movie & Shows;

export interface MoviesResults {
  page: number;
  results: Movie[] | Shows[];
  total_pages: number;
  total_results: number;
}

export interface ShowsResults extends MoviesResults {}

export interface Cast {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order?: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Actor extends Cast {
  also_known_as?: string[];
  biography: string;
  birthday: string;
  deathday: unknown;
  gender: number;
  homepage: unknown;
  id: number;
  imdb_id: string;
  known_for_department: string;
  place_of_birth: string;
}

export interface Crew extends Cast {
  department: string;
  job: string;
}

export interface Languages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieInformation extends Movie {
  belongs_to_collection?: any;
  budget: number;
  credits: { cast: Cast[]; crew: Crew[] };
  genres: GenresData[];
  homepage?: string;
  imdb_id?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Languages[];
  status: string;
  tagline: string;
  videos: {
    results: {
      id: string;
      iso_639_1: string;
      iso_3166_1: string;
      key: string;
      name: string;
      official: boolean;
      published_at: string;
      site: string;
      size: number;
    }[];
  };
}
// TV shows
export interface Networks {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface Creators {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}
export interface TvShowsInformation extends MovieInformation {
  created_by: Creators[];
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air?: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  networks: Networks[];
  next_episode_to_air?: null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  status: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons?: [];
  type: string;
}
export type TVshowsAndMovieInformation = TvShowsInformation & MovieInformation;
export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Images {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
  placeholder?: string;
}
export interface ImagesResults {
  backdrops: Images[];
  id: number;
  logos: Images[];
  posters: Images[];
  profiles?: Images[];
}

export interface ActorImages {
  id: number;
  profiles: Images[];
}

export interface User {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string;
    };
  };
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface UserToken {
  expires_at: string;
  request_token: string;
  success: boolean;
}

export interface UserSessionId {
  session_id: string;
  success: boolean;
}
