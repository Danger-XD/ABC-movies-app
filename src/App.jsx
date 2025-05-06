import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Cards from "./components/Cards";
import { GridLoader } from "react-spinners";
import { useDebounce } from "react-use";

const api_key = import.meta.env.VITE_TMDB_API_KEY;
const api_option = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${api_key}`,
  },
};
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  // debounce hook is for delay in searching text so that it does not call api on every letter of the searching term
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 700, [searchTerm]);
  const fetchData = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
      const endpoint = debouncedSearchTerm
        ? `https://api.themoviedb.org/3/search/movie?query=${debouncedSearchTerm}&include_adult=false&language=en-US&page=1`
        : `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      const response = await fetch(endpoint, api_option);
      if (!response.ok) {
        throw new Error("Error while fetching response!");
      }
      const data = await response.json();
      // console.log(data);
      setMovies(data.results || []);
    } catch (error) {
      console.log("Error while fetching", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [debouncedSearchTerm]);
  return (
    <main>
      <svg viewBox="0 0 200 200" className="moving-pattern" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FF0066"
          d="M45.9,-53.6C62,-41.3,79.2,-29.1,81.6,-14.5C84,0.1,71.8,17.2,59.9,31.7C48.1,46.1,36.7,57.9,23.1,62.4C9.5,66.9,-6.4,64.1,-23.1,59.7C-39.9,55.3,-57.5,49.3,-62.6,37.5C-67.7,25.8,-60.3,8.2,-56.2,-9C-52.1,-26.3,-51.3,-43.3,-42.5,-56.8C-33.7,-70.4,-16.9,-80.6,-1,-79.4C14.9,-78.3,29.9,-65.8,45.9,-53.6Z"
          transform="translate(100 100)"
        />
      </svg>
      <div className="blur-glass" />
      <div className="wrapper">
        <header>
          <p className="md:text-6xl text-4xl text-white font-bold font-heading mb-3">
            ABCmovies
          </p>
          <p className="capitalize text-xl md:text-2xl text-body-100 mb-3 font-body">
            Enjoy your favorites at one Place
          </p>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="mb-5 flex justify-center items-center">
          {loading ? (
            <GridLoader size={30} />
          ) : errorMessage ? (
            <p className="text-red-600">{errorMessage}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
              {movies.map((item, index) => (
                <Cards movie={item} index={index} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
