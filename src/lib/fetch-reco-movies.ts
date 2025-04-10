import {MovieData} from "@/types";

export default async function fetchRecoMovies(): Promise<MovieData[]> {
  const url = `https://onebite-cinema-api-alpha.vercel.app/movie/random`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (err) {
    console.error(err);

    return [];
  }
}