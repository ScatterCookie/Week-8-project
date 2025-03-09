'use client'
import {editMovie} from "../utils/utilities"

export default function EditButton({id}) {
    return(
            <button onClick={() => {
                        editMovie(id);
                    }}>Edit Movie</button>
    )
}