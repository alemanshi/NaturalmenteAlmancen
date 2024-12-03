import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Checkout from './components/Checkout';
import './App.css';
import empresaImg from './assets/foto_nauralmente.png';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <h1 className="titulo">Bienvenid@s</h1>
        <img className="foto_empresa" src={empresaImg} alt="Foto de empresa" />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
