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
  origin_country: string;
  original_name: string;
  poster_path: string;
}

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
}
export interface ImagesResults {
  backdrops: Images[];
  id: number;
  logos: Images[];
  posters: Images[];
}
