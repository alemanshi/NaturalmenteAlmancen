import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import './Item.css'; 
import QuantitySelector from './QuantitySelector'; 
import { useCart } from './CartContext'; 


const Item = ({ id, title, description, image, price }) => {
  // declaro el componente item (recibe propiedades como id, title, description, image y price para cada producto)
  const [quantity, setQuantity] = useState(1); 
  // inicializo el estado quantity usando useState para controlar la cantidad de productos a agrega
  const { addItemToCart } = useCart(); 
  // utilizo el hook useCart para obtener la función addItemToCart del contexto de carrito (permite agregar productos al carrito)
  const handleQuantityChange = (newQuantity) => {
    // función se ejecuta cuando el usuario cambia la cantidad de productos
    setQuantity(newQuantity); 
    // actualiza el estado de quantity con la nueva cantidad seleccionada
  };

  const handleAddToCart = () => {
    addItemToCart({ id, title, description, image, price }, quantity); 
    // llama a la función addItemToCart con los datos del producto y la cantidad seleccionada para agregar el producto al carrito
  };

  return (
    <div className="item-card"> 
      <img src={image} alt={title} className="item-image" />
      <div className="item-info">
        <h3 className="item-title">{title}</h3> 
        <p className="item-description">{description}</p>
        <p className="item-price">Precio: ${price}</p>
        
        <QuantitySelector initialQuantity={quantity} onQuantityChange={handleQuantityChange} />
        {/* muestra el componente QuantitySelector, que permite al usuario seleccionar la cantidad (se pasa la cantidad inicial y la función que actualiza el estado) */}
        <Link to={`/item/${id}`} className="item-link">Ver detalles</Link>
        {/* enlace que lleva a la página de detalles del producto (ruta diámica por id) */}
        <button onClick={handleAddToCart} className="add-to-cart-button">Agregar al carrito</button>
        {/* botón que ejecuta la función handleAddToCart para agregar el producto al carrito */}
      </div>
    </div>
  );
};

export default Item;
