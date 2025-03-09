'use client'
import { handleDelete } from "@/app/utils/utilities"


export default function DeleteButton({id}) {


    return (
        <button onClick={() => {
            handleDelete(id)
        }}>X</button>
    )
}