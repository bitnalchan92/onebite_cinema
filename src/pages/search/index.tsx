import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import style from './index.module.css';
import MovieItem from "@/pages/components/movie-item";
import fetchAllMovies from "@/lib/fetch-all-movies";
import {useRouter} from "next/router";
import {MovieData} from "@/types";
import Head from "next/head";

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
    <>
      <Head>
        <title>한입씨네마 - 검색결과</title>
        <meta property='og:image' content='/thumbnail.png'/>
        <meta property='og:title' content='한입씨네마 - 검색결과'/>
        <meta property='og:description' content='한입씨네마에 등록된 영화들을 만나보세요.'/>
      </Head>
      <div className={style.container}>
        {movies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return (
    <SearchableLayout>
      {page}
    </SearchableLayout>
  )
}