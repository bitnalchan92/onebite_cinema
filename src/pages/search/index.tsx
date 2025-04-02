import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import {MovieData} from "@/types";
import style from './index.module.css';
import {useRouter} from "next/router";
import movies from '@/mock/dummy.json';

export default function Page() {
  const router = useRouter();
  const q = router.query.q as string;
  console.log(q);

  const searchedMovies: MovieData[]
    = movies.filter(movie => movie.title.includes(q));

  return (
    <div className={style.container}>
      {searchedMovies.map((movie) => <img src={movie.posterImgUrl} alt={movie.title}/>)}
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