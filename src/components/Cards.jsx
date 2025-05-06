import React from "react";
import { FaStar } from "react-icons/fa";

const Cards = ({ movie, index }) => {
  const {
    title,
    release_date: year,
    original_language: language,
    vote_average: voting,
    poster_path: poster,
  } = movie;
  const rating = voting.toFixed(1);
  const time = year.slice(0, 4); //year[0] + year[1] + year[2] + year[3]
  return (
    <div className="card-box" key={index}>
      <div className="card-image">
        <img
          src={
            poster
              ? `https://image.tmdb.org/t/p/w500/${poster}`
              : "https://placehold.co/400"
          }
          alt=""
        />
      </div>
      <div className="card-desc">
        <div className="card-title">
          <h1 className="font-body text-[18px]">{title}</h1>
          <h2>
            {time} - {language} <FaStar className="inline-block" /> {rating}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Cards;
