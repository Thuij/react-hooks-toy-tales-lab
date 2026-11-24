import React, { useEffect, useState } from "react";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((response) => response.json())
      .then((data) => setToys(data))
      .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  function handleLike(id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toys.find((toy) => toy.id === id).likes + 1,
      }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((currentToys) =>
          currentToys.map((toy) =>
            toy.id === id ? updatedToy : toy
          )
        );
      });
  }

  function handleDonate(id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((currentToys) =>
        currentToys.filter((toy) => toy.id !== id)
      );
    });
  }



    const handleAddToy = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const name = formData.get("name");
  const image = formData.get("image");

  const newToy = {
    name,
    image,
    likes: 0
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newToy)
  })
    .then((response) => response.json())
    .then((toy) => {
      setToys((currentToys) => [...currentToys, toy]);
      event.target.reset();
    });
};

  return (
    <div className="App">
      <header>
        <h1>Toy Tales</h1>
      </header>

<form onSubmit={handleAddToy}>
  <input
    type="text"
    name="name"
    placeholder="Enter a toy's name..."
    required
  />

  <input
    type="text"
    name="image"
    placeholder="Enter a toy's image URL..."
    required
  />

  <button type="button">Add a Toy</button>

  <button type="submit">Create New Toy</button>
</form>
      

      <div className="toy-container">
        {toys.map((toy) => (
          <div className="toy-card" data-testid="toy-card" key={toy.id}>
            <img src={toy.image} alt={toy.name} />

            <h2>{toy.name}</h2>

            <p>{toy.likes} Likes </p>

            <button type="button" onClick={() => handleLike(toy.id)}>
              Like &lt;3
            </button>

            <button type="button" onClick={() => handleDonate(toy.id)}>
              Donate to GoodWill
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;