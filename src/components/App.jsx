import React, { useState, useEffect } from "react";
import ToyContainer from "./ToyContainer";
import NewToyForm from "./NewToyForm";
import "../App.css";

function App() {
  const [toys, setToys] = useState([]);

  // GET: Fetch all toys when the page loads
  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch toys");
        }
        return response.json();
      })
      .then((data) => setToys(data))
      .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  // POST: Add a new toy
  function handleAddToy(newToy) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create toy");
        }
        return response.json();
      })
      .then((createdToy) => {
        setToys((currentToys) => [...currentToys, createdToy]);
      })
      .catch((error) => console.error("Error adding toy:", error));
  }

  // PATCH: Increase toy likes
  function handleLikeToy(updatedToy) {
    fetch(`http://localhost:3000/toys/${updatedToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedToy.likes + 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update likes");
        }
        return response.json();
      })
      .then((likedToy) => {
        setToys((currentToys) =>
          currentToys.map((toy) =>
            toy.id === likedToy.id ? likedToy : toy
          )
        );
      })
      .catch((error) => console.error("Error liking toy:", error));
  }

  // DELETE: Remove a toy
  function handleDeleteToy(id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete toy");
        }

        setToys((currentToys) =>
          currentToys.filter((toy) => toy.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting toy:", error));
  }

  return (
    <div className="App">
      <header>
        <h1>Toy Tales</h1>
      </header>

      <NewToyForm onAddToy={handleAddToy} />

      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDeleteToy={handleDeleteToy}
      />
    </div>
  );
}

export default App;