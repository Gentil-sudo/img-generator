import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [radio, setRadio] = useState(""); // Valor do rádio será armazenado aqui
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadLogo, setUploadLogo] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // Cor de fundo 
  const [textColor, setTextColor] = useState("#ffffff");

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
        setUploadLogo(reader.result);
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

  const handleColorChange = (event) => {
    const color = event.target.value;
    setBackgroundColor(color);
  };

  const handleColorChangeText = (event) => {
    const textColor = event.target.value;
    setTextColor(textColor);
  };

  // Use useEffect to apply the background color to the .product-box element
  useEffect(() => {
    const productBox = document.querySelector(".product-box");
    if (productBox) {
      productBox.style.backgroundColor = backgroundColor;
    }
  }, [backgroundColor]);

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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <div className="input-radio-container">
                <div className="radio-price">
                  <label className="input-rdo">Preço</label>
                  <input
                    type="radio"
                    name="productType" // Nome do grupo
                    value="price" // Valor do rádio
                    checked={radio === "price"}
                    onChange={(e) => setRadio(e.target.value)}
                    className="radio"
                  />
                </div>

                <div className="radio-contact">
                  <label className="input-rdo">Contato</label>
                  <input
                    type="radio"
                    name="productType" // Nome do grupo
                    value="contact" // Valor do rádio
                    checked={radio === "contact"}
                    onChange={(e) => setRadio(e.target.value)}
                    className="radio"
                  />
                </div>
              </div>
              <label htmlFor="">Imagem do Produto</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="input-file"/>
              <label htmlFor="">Imagem da Empresa</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleExampleImageChange}
                className="input-file"
              />
              <label htmlFor="">Escolha a Cor de Fundo</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={handleColorChange}
              />
               <label htmlFor="">Escolha a Cor do Texto</label>
              <input
                placeholder="Cor do Texto"
                type="color"
                value={textColor}
                onChange={handleColorChangeText}
              />
              <button onClick={handleGenerateImage}>Gerar Imagem</button>
            </div>
          </header>
          <div
            id="product-card"
            className="product-box"
          >
            <div className="product-container">
              <div className="product-content">
                <div className="product-image">
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Produto"
                      className="product-image-content"
                    />
                  )}
                </div>
                <h2 className="title">
                  <strong className="promotion">Promoção! </strong>
                  <br />
                  <em>
                    <p className="product-name">{name}</p>
                  </em>
                </h2>
                <p className="description">
                  <strong></strong>
                  <br />
                  {description}
                </p>
                <p className="price">
                  <strong className="price-strong">
                    Faça já <br /> seu pedido
                  </strong>
                  <span className="price-value">
                    {radio === "price" ? "Preço" : "Contato"} {/* Exibe o valor selecionado */}
                    <p className="price-price">{price}</p>
                  </span>
                </p>
                {uploadLogo && (
                  <img
                    src={uploadLogo}
                    alt="Imagem Exemplo"
                    className="logo-image"
                  />
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
