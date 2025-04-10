import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import MovieItem from "@/pages/components/movie-item";
import style from './index.module.css';
import fetchAllMovies from "@/lib/fetch-all-movies";
import {InferGetStaticPropsType} from "next";
import fetchRecoMovies from "@/lib/fetch-reco-movies";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchAllMovies(), fetchRecoMovies()
  ])

  return {
    props: {
      allMovies,
      recoMovies,
    },
    revalidate: 3,
  }
}

export default function Home({allMovies, recoMovies}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입씨네마</title>
        <meta property='og:image' content='/thumbnail.png'/>
        <meta property='og:title' content='한입씨네마'/>
        <meta property='og:description' content='한입씨네마에 등록된 영화들을 만나보세요.'/>
      </Head>
      <div>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={style.recommend_movie_container}>
            {recoMovies.map((movie) => <MovieItem key={movie.id} {...movie}/>)}
          </div>
        </section>

        <section style={{marginTop: "40px"}}>
          <h3>등록된 모든 영화</h3>
          <div className={style.movie_container}>
            {allMovies.map((movie) => <MovieItem key={movie.id} {...movie}/>)}
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return (
    <SearchableLayout>
      {page}
    </SearchableLayout>
  );
}