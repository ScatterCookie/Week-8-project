import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";
import { db } from "../utils/db";

export default function NewMovieForm() {
    async function handleNewMovie(movieData){
        "use server";
        console.log("Saving New Movie...");

        const title = movieData.get("title");
        const ageRating = movieData.get("age_rating");
        const releaseDate = movieData.get("release_date");
        const filmRating = movieData.get("film_rating");
        const description = movieData.get("description");
        const mainLead = movieData.get("main_lead");
        const posterURL = movieData.get("img_url")

        var id = await db.query(`INSERT INTO movies_full (title, age_rating, release_date, film_rating, description, main_lead, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
            title,
            ageRating,
            releaseDate,
            filmRating,
            description,
            mainLead,
            posterURL
        ])

        var res = await db.query(`SELECT * FROM movies_full`)


        await db.query(`INSERT INTO movie_comments (movies_full_post_f_key, post_content) VALUES ($1, $2)`, [res.length, ''])
        console.log(db.query);

        revalidatePath("/movies");

        redirect(`/movies`);
    }

    return(
        <form style={{display: 'flex', flexDirection: 'column', width: '200px', alignSelf: 'center'}} action={handleNewMovie}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" required />

            <label htmlFor="age_rating">Age Rating</label>
            <input id="age_rating" name="age_rating" type="text" required />

            <label htmlFor="release_date">Release Date</label>
            <input id="release_date" name="release_date" type="date"required  />

            <label htmlFor="film_rating">Film Rating</label>
            <input id="film_rating" name="film_rating" type="text" required />

            <label htmlFor="description">Description</label>
            <input id="description" name="description" type="text" required />

            <label htmlFor="main_lead">Main Lead</label>
            <input id="main_lead" name="main_lead" type="text" required />

            <label htmlFor="img_url">Poster URL</label>
            <input id="img_url" name="img_url" required />
            <br/>

            <button type="submit">Save</button>
            <br/>
        </form>
    )
}
