'use server'
import { db } from "./db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";

export async function deleteComment(id) {
    console.log(id)
        await db.query(`DELETE FROM movie_comments WHERE id = $1`, [id])
        revalidatePath(`/comments`);
    
        redirect("/comments");
    }