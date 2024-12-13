import "./Main.css"
import { getMovies } from "../Main";
import { useState ,useEffect } from "react";
// import MainCard from "./mainCard/MainCard";
import MainCard from "../maincard/MainCard";

function Main(){

   let [movie , setMovie] = useState([]);


       useEffect(()=>{
        var getMyMovies = getMovies()
           getMyMovies.then((res)=>{
            console.log(res.data.results)
            setMovie(res.data.results)
           }).catch((err)=>{
            console.log(err)
           })
       },[])


    return(
        <div className="Main">
            <h1>Trending Movies</h1>
            <div className="MainMovies">
                {
                    movie.map((movies , i)=>{
                        return(
                            <MainCard movie={movies}/>
                        )
                    })
                }
            {/* <MainCard/> */}
            </div>
        </div>
    )
}

export default Main;