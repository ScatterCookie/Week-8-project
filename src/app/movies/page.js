import Link from "next/link";
import Image from "next/image";
import { db } from "../utils/db";


export default async function Page({searchParams}) {
    const search = await searchParams;

    const data = await db.query(`SELECT * FROM movies_full`);
    const movies = data.rows

    if(search.sortby === `desc`){
        movies.sort((a, b) => {
            return b.title.localeCompare(a.title)
        })
    } else if(search.sortby === `asc`)
        movies.sort((a, b) => {
            return a.title.localeCompare(b.title)
        });

    return (
        <>
        <div className="flex gap-10">
            <Link href='/movies?sortby=asc'>asc</Link>
            <Link href='/movies?sortby=desc'>desc</Link>
        </div>
        <div className="flex flex-wrap">
            {movies.map((movie) => (
                <div key={movie.id} className="m-8 shadow-xl text-white w-fit p-5">
                    <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
                        <p>{new Date(movie.release_date).toLocaleString("en-GB", "full").split(" ")[0]}</p>
                        <Image height={250} width={150} alt={movie.title} src={movie.img_url} />
                </div>
            ))}
        </div>
      </>
    )
}