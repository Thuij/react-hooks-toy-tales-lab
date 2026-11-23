import React from "react";

function ToyCard({ toy, onLikeToy, onDeleteToy }) {
  return (
    <div className="toy-card">
      <img src={toy.image} alt={toy.name} />

      <h2>{toy.name}</h2>

      <p>Likes: {toy.likes}</p>

      <button onClick={() => onLikeToy(toy)}>
        Like ❤️
      </button>

      <button onClick={() => onDeleteToy(toy.id)}>
        Donate 🧸
      </button>
    </div>
  );
}

export default ToyCard;