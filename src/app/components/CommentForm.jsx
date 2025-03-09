import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";
import { db } from "../utils/db";

export default function CommentsForm({id}) {
    async function handleNewComment(formData){
        "use server";

        const movieID = formData.get("movie_full.id")
        const comment = formData.get("post_content")

        console.log(`commentsForm; ${movieID}`);

        await db.query(`INSERT INTO movie_comments (movies_full_post_f_key, post_content) VALUES ($1, $2)`, [id, comment])

        revalidatePath(`/comments`);

        redirect(`/comments`)
    }
    return(
        <form style={{display: 'flex', flexDirection: 'column', width: '200px', alignSelf: 'center'}} action={handleNewComment}>
            <label htmlFor="post_content">Write comment here!</label>
            <input id="post_content" name="post_content" type="text" />
            <button type="submit">Save Comment</button>
        </form>
    )
}