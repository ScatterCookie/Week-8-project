import { db } from "@/app/utils/db"
import Image from "next/image"
import DeleteButton from "@/app/components/DeleteButton"
import CommentForm from "@/app/components/CommentForm"
import EditButton from "@/app/components/EditButton"


export default async function Page({params}) {
    const {id} = await params


    const res = await db.query(`SELECT * FROM movies_full WHERE id = $1`, [id])
    const movie = res.rows[0]

    const result = await db.query(`SELECT * FROM movie_comments WHERE movies_full_post_f_key = $1`, [movie.id])
    const moviePost = result.rows[0]

    return( 
        <div>
            <h2>{movie.title}</h2>
            <p>{movie.age_rating}</p>
            <p>{new Date(movie.release_date).toISOString().split("T")[0]}</p>
            <p>{movie.film_rating}</p>
            <p>{movie.description}</p>
            <p>{movie.main_lead}</p>
            <Image height={500} width={350} alt={movie.title} src={movie.img_url} />
            <ul>
            {result.rows.map((movie) => (
                <li key={movie.id}>{movie.post_content}</li>
            ))}
            </ul>
            <EditButton id={movie.id}/>
            <DeleteButton id={movie.id}/>
            {(moviePost) ?
            <CommentForm key={moviePost.id} id={movie.id} content={moviePost.post_content} />: <CommentForm id={movie.id} />
            }
        </div>
    )
}