import type {MovieData} from "@/types";
import style from './movie-item.module.css';
import Link from "next/link";

export default function MovieItem({title, posterImgUrl}: MovieData) {
  return (
    <Link href={``}>
      <img src={posterImgUrl} alt={title}/>
    </Link>
  );
}