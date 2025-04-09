import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import style from './index.module.css';
import MovieItem from "@/pages/components/movie-item";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchAllMovies from "@/lib/fetch-all-movies";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q as string;
  const movies = await fetchAllMovies(q)

  return {
    props: {
      movies
    }
  }
}

export default function Page({movies}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (movies.length === 0 ) {
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