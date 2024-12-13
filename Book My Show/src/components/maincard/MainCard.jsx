import { Link } from "react-router-dom";

import "./MainCard.css";

function MainCard({ movie }) {
    return (
        <div className="MainCard">
            <Link 
                to={`/movies/${movie.id}`} 
                style={{ textDecoration: "none", color: "black" }}
            >
                <img 
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                    alt={`${movie.title} poster`} 
                    width="100%" 
                    height="350px" 
                />
                <h6>{movie.title}</h6>
            </Link>
        </div>
    );
}

export default MainCard;
