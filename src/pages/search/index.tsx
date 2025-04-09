import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import style from './index.module.css';
import MovieItem from "@/pages/components/movie-item";
import fetchAllMovies from "@/lib/fetch-all-movies";
import {useRouter} from "next/router";
import {MovieData} from "@/types";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchAllMovies(q as string);
    setMovies(data);
  }

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  if (movies.length === 0) {
    return (
      <div>검색 결과가 없습니다.</div>
    );
  }

  return (
    <div className={style.container}>
      {movies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
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