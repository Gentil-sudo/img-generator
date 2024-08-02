// src/ImageResultPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function ImageResultPage() {
  const location = useLocation();
  const { image, name, description, price } = location.state || {};

  return (
    <div className="ImageResultPage">
      <header className="App-header">
        <h1>Resultado da Imagem</h1>
        <div className="product-box">
          {image && <img src={image} alt="Imagem Gerada" />}
          <h2>{name}</h2>
          <p>{description}</p>
          
        </div>
        <footer >@Enzo Gentil</footer>
      </header>
    </div>
  );
}

export default ImageResultPage;
