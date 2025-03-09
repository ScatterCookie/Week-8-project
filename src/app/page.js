import NewMovieForm from "./components/MovieForm"
import LikeButton from "./components/LikeButton"

export default function Home() {

  return(
    <div>
        <h1>Welcome to my small Movie Database</h1>
        <h2>Fill out the below form to contribute to the Database</h2>
        <NewMovieForm />
        <LikeButton />
    </div>
  )
}