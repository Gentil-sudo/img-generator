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
    <>

    <div className="App">
      <div className="App-content">

      <header className="App-header">
        <h1>Gerador de Imagens de Produto</h1>
        <div className="form-container">
          <label htmlFor="">Nome do Produto</label>
          <input
            type="text"
            placeholder="Nome do Produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Descrição do Produto</label>
          <textarea
            placeholder="Descrição do Produto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="">Preço</label>
          <input
            type="text"
            placeholder="Preço ou Contato"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="">Imagem do Produto</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <label htmlFor="">Imagem da Empresa</label>
          <input type="file" accept="image/*" onChange={handleExampleImageChange} />
          <button onClick={handleGenerateImage}>Gerar Imagem</button>
        </div>
      </header>
      <div id="product-card" className="product-box">
        <div className="product-container">
          <div className="product-content">
        <div className="product-image">
          {uploadedImage && (
            <img src={uploadedImage} alt="Produto" className="product-image-content" />
          )}
        </div>
            <h2 className="title">
              <strong className="promotion">Promoção! </strong>
              <br />
             <em> <p className="product-name">{name}</p></em> 
            </h2>
            <p className="description">
              <strong></strong>
              <br />
              {description}
            </p>
            <p className="price">
              <strong className="price-strong">Faça já <br /> seu pedido</strong>
              <span className="price-value">
                Saiba mais:
                <p className="price-price">{price}</p>
              </span>
            </p>
            {/* Adiciona a imagem importada abaixo do preço */}
            {uploadLogo && (
              <img src={uploadLogo} alt="Imagem Exemplo" className="logo-image" />
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
      <footer className="footer">@Enzo Gentil</footer>
    </>
  );
}

export default App;
