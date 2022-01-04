
export interface MovieAPI {
  adult: boolean;
  backdrop_path: string;
  id: number;
  genre_ids: number[],
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

// export interface MoviesAPI {
//   page: number;
//   results: MovieAPI[];
//   total_pages: number;
//   total_results: number;
// }
