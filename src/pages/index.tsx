import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import movies from '@/mock/dummy.json';
import MovieItem from "@/pages/components/movie-item";
import {MovieData} from "@/types";
import style from './index.module.css';

export default function Home() {
  const movieData: MovieData[] = movies;
  const recommendMovies: MovieData[] = movieData
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 3);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommend_movie_container}>
          {recommendMovies.map((movie) => <MovieItem key={movie.id} {...movie}/>)}
        </div>
      </section>

      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.movie_container}>
          {movieData.map((movie) => <MovieItem key={movie.id} {...movie}/>)}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return (
    <SearchableLayout>
      {page}
    </SearchableLayout>
  );
}