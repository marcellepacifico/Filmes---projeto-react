import "./carousel.css";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Carousel() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const carousel = useRef(null);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results.slice(0, 3));
      setLoading(false);
    }
    loadFilmes();
  }, []);

  const handleLeftClick = (e) =>{
      carousel.current.scrollLeft -= carousel.current.offsetWidth
  }

  const handleRightClick = (e) =>{
    carousel.current.scrollLeft += carousel.current.offsetWidth
  }

  return (
    <div className="container">
      <div className="carousel" ref={carousel}>
        {filmes.map((filme) => {
          const { id, title } = filme;
          return (
            <div className="item" key={id}>
              <div className="image">
                <img
                  src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
                  alt={title}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button onClick={handleLeftClick}>
          {" "}
          <img src="setas.png" alt="Scroll left" />
        </button>
        <button onClick={handleRightClick}>
          {" "}
          <img src="setas.png" alt="Scroll right" />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
