import {MovieData} from "@/types";
import style from './[id].module.css';
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = Number(context.params?.id);
  const movie = await fetchOneMovie(id);

  return {
    props: {
      movie
    }
  }
}

export default function Page({movie}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movie) {
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
  }: MovieData = movie;

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