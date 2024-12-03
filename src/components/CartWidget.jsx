import React from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import './CartWidget.css'; 

const CartWidget = ({ cartCount }) => { 
  // recibo cartCount como una propiedad que contiene el número de artículos en el carrito

  return (
    <span className="widget-carrito"> 
        <FontAwesomeIcon icon={faShoppingCart} className="icono-carrito" />
          {cartCount > 0 && <span className="contador-items">{cartCount}</span>}
      {/* si cartCount es mayor que 0, muestro el número de artículos en el carrito. Caso contrario, no se muestra nada. */}
    </span>
  );
};

export default CartWidget; 
