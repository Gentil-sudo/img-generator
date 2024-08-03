// src/ImageResultPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function ImageResultPage() {
  const location = useLocation();
  const { image, name, description } = location.state || {};

  const saveImage = () => {
    if (!image) return;

    // Criar um link para download da imagem
    const link = document.createElement('a');
    link.href = image;
    link.download = name || 'imagem'; // Define o nome do arquivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="ImageResultPage">
      <header className="App-header">
        <h1>Resultado da Imagem</h1>
        <div className="product-box">
          {image && <img src={image} alt="Imagem Gerada" />}
          <h2>{name}</h2>
          <p>{description}</p>
          <button onClick={saveImage}>Salvar Imagem</button>
        </div>
        <footer>@Enzo Gentil</footer>
      </header>
    </div>
  );
}

export default ImageResultPage;
