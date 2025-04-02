import {useRouter} from "next/router";
import {MovieData} from "@/types";
import movies from '@/mock/dummy.json';
import style from './[id].module.css';

export default function Page() {
  const router = useRouter();
  const {id} = router.query;

  const foundMovie = movies.find((movie) => movie.id.toString() === id);
  if ( !foundMovie ) {
    return (
      <div>
        <div style={{marginTop: '20px'}}>검색하신 영화를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl
  }: MovieData = foundMovie;

  return (
    <div className={style.container}>
      <div style={{backgroundImage: `url('${posterImgUrl}')`}} className={style.cover_img_container}>
        <img src={posterImgUrl} alt={title}/>
      </div>
      <div className={style.title}>{title}</div>
      <div>{releaseDate} / {genres.join(', ')} / {runtime}분</div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}