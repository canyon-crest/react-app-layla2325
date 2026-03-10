import React from "react";

function CardComponent({ title, content }) {
  return (
    <div className="card-component">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default CardComponent;