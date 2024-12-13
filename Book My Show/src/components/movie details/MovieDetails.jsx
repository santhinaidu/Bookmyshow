
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './movieDetails.css';

function Moviedetails() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Track selected language
  const [selectedFormat, setSelectedFormat] = useState(null); // Track selected format
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=41c953dc7d1c21d27df7b693e9740a3c`)
      .then(res => {
        setMovieDetails(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  if (!movieDetails) {
    return <p>Loading...</p>; // Display a loading message until data is available
  }

  const backDropUrl = `https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`;
  const genres = movieDetails.genres.map(genre => genre.name).join(', ');
  const runtimeHours = Math.floor(movieDetails.runtime / 60);
  const runtimeMinutes = movieDetails.runtime % 60;
  const formattedRuntime = `${runtimeHours}h ${runtimeMinutes}m`;
  const releaseDate = new Date(movieDetails.release_date);
  const formattedReleaseDate = releaseDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const rating = movieDetails.vote_average ? `${movieDetails.vote_average.toFixed(1)}/10` : "N/A";
  const votes = movieDetails.vote_count ? `${(movieDetails.vote_count / 1000).toFixed(1)}K` : "N/A";

  return (
    <div className="main-container">
      <section className="section-container">
        <div className="backdrop" style={{ backgroundImage: `url(${backDropUrl})` }}>
          <div className="inner-container">
            <div className="image-container">
              <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt="poster" />
            </div>
            <div className="details-container">
              <h1>{movieDetails.title}</h1>
              <div className="rating-container">
                <i className="bi bi-star-fill"></i>
                <span>{rating}</span>
                <span>({votes} Votes)</span>
              </div>
              <p className="movie-info">
                {formattedRuntime} | {genres} | {formattedReleaseDate}
              </p>
              <button id="bt" onClick={togglePopup}>Book tickets</button>
            </div>
          </div>
        </div>
      </section>
      <div className="overview-container">
        <h3 className="overview-title">About Movie : </h3>
        <p className="overview-text">{movieDetails.overview}</p>
      </div>

      {/* Pop-Up Component */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="launguageclosebtn">
              <p>{movieDetails.title}</p>
              <button onClick={togglePopup} className="popup-close">×</button>
            </div>
            <h5 className="heading">Select Language and Format</h5>
          
            {/* Language Selection */}
            <div className="popup-languages">
              <h5 className="formatesandlang">Languages</h5>
              <div className="languageBtn">
                {["Tamil", "Telugu", "English"].map(language => (
                  <button
                    key={language}
                    style={{
                      backgroundColor: selectedLanguage === language ? 'lightblue' : 'rgb(236, 243, 245)',
                      width: '20%',
                      color: 'black',
                      margin: '5px 10px',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '50px'
                    }}
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div className="popup-formats">
              <h5 className="formatesandlang">Formats</h5>
              <Link to={"/BookTicket"}><div>
                {["2D", "3D", "4D"].map(format => (
                  <button
                    key={format}
                    style={{
                      backgroundColor: selectedFormat === format ? 'lightblue' : 'rgb(236, 243, 245)',
                      width: '20%',
                      color:'black',
                      margin: '5px 10px',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '50px'
                    }}
                    onClick={() => setSelectedFormat(format)}
                  >
                    {format}
                  </button>
                ))}
              </div></Link> 
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Moviedetails;
