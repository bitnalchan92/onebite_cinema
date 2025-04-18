import {MovieData} from "@/types";
import style from './[id].module.css';
import {GetStaticPropsContext, InferGetServerSidePropsType} from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";
import {useRouter} from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = Number(context.params!.id);
  const movie = await fetchOneMovie(id);

  if (!movie) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      movie
    }
  }
}

export default function Page({movie}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입씨네마</title>
          <meta property='og:image' content='/thumbnail.png'/>
          <meta property='og:title' content='한입씨네마'/>
          <meta property='og:description' content='한입씨네마에 등록된 영화들을 만나보세요.'/>
        </Head>
        <div>
          <div style={{marginTop: '20px'}}>로딩중 입니다...</div>
        </div>
      </>
    );
  }

  if (!movie) {
    return (
      <div>
        <div style={{marginTop: '20px'}}>문제가 발생했습니다. 다시 시도해주세요.</div>
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
    <>
      <Head>
        <title>한입씨네마 - {title}</title>
        <meta property='og:image' content={posterImgUrl}/>
        <meta property='og:title' content={title}/>
        <meta property='og:description' content={description}/>
      </Head>
      <div className={style.container}>
        <div style={{backgroundImage: `url('${posterImgUrl}')`}} className={style.cover_img_container}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={posterImgUrl} alt={title}/>
        </div>
        <div className={style.title}>{title}</div>
        <div>{releaseDate} / {genres.join(', ')} / {runtime}분</div>
        <div>{company}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}