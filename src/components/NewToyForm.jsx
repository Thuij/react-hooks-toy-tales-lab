import React, { useState } from "react";

function NewToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !image.trim()) return;

    onAddToy({
      name: name,
      image: image,
      likes: 0,
    });

    setName("");
    setImage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Toy name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(event) => setImage(event.target.value)}
      />

      <button type="submit">Add Toy</button>
    </form>
  );
}

export default NewToyForm;