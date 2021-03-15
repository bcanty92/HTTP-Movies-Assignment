import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Link } from 'react-router-dom';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:3333/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch((err) => console.log(err));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="edit-button">
        <Link to={`/update-movie/${params.id}`}>Update Movie</Link>
      </div>
    </div>
  );
}

export default Movie;