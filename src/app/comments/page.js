import Link from "next/link";
import { db } from "../utils/db";
import DeleteCommentButton from "../components/CommentDelete";


export default async function Page({searchParams}) {
    const search = await searchParams;

    const data = await db.query(`SELECT * FROM movie_comments`);
    const comments = data.rows
    console.log(comments);

    if(search.sortby === `desc`){
        comments.sort((a, b) => {
            return b.post_content.localeCompare(a.post_content)
        })
    } else if(search.sortby === `asc`)
        comments.sort((a, b) => {
            return a.post_content.localeCompare(b.post_content)
        });

    return (
        <>
        <div className="flex gap-10">
            <Link href='/comments?sortby=asc'>asc</Link>
            <Link href='/comments?sortby=desc'>desc</Link>
        </div>
        <div className="flex flex-wrap">
            {comments.map((comment) => (
                <div key={comment.id} className="m-8 shadow-xl text-white w-fit p-5">
                    <p href={`/comments/${comment.id}`}>{comment.post_content}</p>
                    <DeleteCommentButton id={comment.id}/>
                </div>
            ))}
        </div>
      </>
    )
}