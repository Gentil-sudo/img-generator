// src/App.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = () => {
    html2canvas(document.querySelector("#product-card")).then(canvas => {
      const img = canvas.toDataURL("image/png");
      navigate('/imagemres', { state: { image: img, name, description, price } });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gerador de Imagens de Produto</h1>
        <div className="form-container">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Descrição do Produto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button onClick={handleGenerateImage}>Gerar Imagem</button>
        </div>
        <div id="product-card" className="product-card">
          {uploadedImage && <img src={uploadedImage} alt="Produto" className="product-image" />}
          <div className='product-content'>
          <h2>{name}</h2>
          <p><strong>Descrição:</strong> <br />{description}</p>
          <p ><strong className="price">Preço:</strong> <br />{price}</p>
          </div>
        </div>
      <footer >@Enzo Gentil</footer>
      </header>
    </div>
  );
}

export default App;
