import type {MovieData} from "@/types";
import Link from "next/link";

export default function MovieItem({id, title, posterImgUrl}: MovieData) {
  return (
    <Link href={`/movie/${id}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={posterImgUrl} alt={title}/>
    </Link>
  );
}