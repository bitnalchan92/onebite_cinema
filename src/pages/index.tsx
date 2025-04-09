import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import MovieItem from "@/pages/components/movie-item";
import style from './index.module.css';
import fetchAllMovies from "@/lib/fetch-all-movies";
import {InferGetServerSidePropsType} from "next";
import fetchRecoMovies from "@/lib/fetch-reco-movies";

export const getServerSideProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchAllMovies(), fetchRecoMovies()
  ])

  return {
    props: {
      allMovies,
      recoMovies,
    }
  }
}

export default function Home({allMovies, recoMovies}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
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
  );
}

Home.getLayout = (page: ReactNode) => {
  return (
    <SearchableLayout>
      {page}
    </SearchableLayout>
  );
}