import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import {MovieData} from "@/types";
import style from './index.module.css';
import {useRouter} from "next/router";
import movies from '@/mock/dummy.json';
import MovieItem from "@/pages/components/movie-item";

export default function Page() {
  const router = useRouter();
  const q = router.query.q as string;

  const searchedMovies: MovieData[]
    = movies.filter(movie => movie.title.includes(q));

  if (searchedMovies.length === 0 ) {
    return (
      <div>검색 결과가 없습니다.</div>
    );
  }

  return (
    <div className={style.container}>
      {searchedMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return (
    <SearchableLayout>
      {page}
    </SearchableLayout>
  )
}