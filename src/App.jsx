import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadLogo, setUploadLogo] = useState(null); // Novo estado para a imagem do exemplo

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

  const handleExampleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadLogo(reader.result); // Atualiza o estado com a imagem importada
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = () => {
    html2canvas(document.querySelector("#product-card")).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      navigate("/imagemres", {
        state: { image: img, name, description, price },
      });
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
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <input type="file" accept="image/*" onChange={handleExampleImageChange} />
          <button onClick={handleGenerateImage}>Gerar Imagem</button>
        </div>
      </header>
      <div id="product-card" className="product-box">
        <div className="product-image">
          {uploadedImage && (
            <img src={uploadedImage} alt="Produto" className="product-image-content" />
          )}
        </div>
        <div className="product-container">
          <div className="product-content">
            <h2 className="title">
              <strong className="promotion">Promoção! </strong>
              <br />
              <p className="product-name">{name}</p>
            </h2>
            <p className="description">
              <strong></strong>
              <br />
              {description}
            </p>
            <p className="price">
              <strong className="price-strong">Faça já <br /> seu pedido</strong>
              <span className="price-value">
                Confira em:
                <p className="price-price">{price}</p>
              </span>
            </p>
            {/* Adiciona a imagem importada abaixo do preço */}
            {uploadLogo && (
              <img src={uploadLogo} alt="Imagem Exemplo" className="example-image" />
            )}
          </div>
        </div>
      </div>
      <footer>@Enzo Gentil</footer>
    </div>
  );
}

export default App;
