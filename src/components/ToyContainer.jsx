import React from "react";
import ToyCard from "./ToyCard";

function NewToyContainer({ toys, onLikeToy, onDeleteToy }) {
  return (
    <div className="toy-container">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onLikeToy={onLikeToy}
          onDeleteToy={onDeleteToy}
        />
      ))}
    </div>
  );
}

export default NewToyContainer;