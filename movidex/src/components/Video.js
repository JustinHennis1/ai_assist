import React, { useEffect, useState } from 'react';

const MovieVideo = ({ movie }) => {
  const [videoKey, setVideoKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTrailer() {
      if (!movie?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/youtube/${movie.id}`);
        const data = await response.json();

        // Find the first video that is a trailer
        const trailer = data.results.find(video => video.type === 'Trailer');
        if (trailer) {
          setVideoKey(trailer.key);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Failed to fetch movie trailer:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchTrailer();
  }, [movie?.id]);

  if (loading) {
    return <p>Loading trailer...</p>;
  }

  if (error || !videoKey) {
    return <p>Trailer not available</p>;
  }

  return (
    <div className="movie-video">
      <iframe
        width="100%"
        height="250px"
        src={`https://www.youtube.com/embed/${videoKey}`}
        title={movie.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieVideo;
