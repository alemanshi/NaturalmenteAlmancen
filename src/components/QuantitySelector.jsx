import React, { useState } from 'react'; 

  // el componente recibe 2 props:
  // initialQuantity: el valor inicial de la cantidad (por defecto = 1)
  // onQuantityChange: una función que se ejecutará cada vez que cambie la cantidad
const QuantitySelector = ({ initialQuantity = 1, onQuantityChange }) => { 
  const [quantity, setQuantity] = useState(initialQuantity); 
  // declaro una variable quantity y una función setQuantity para manejar el estado de la cantidad
  // inicializo quantity con el valor de initialQuantity

  const increaseQuantity = () => {  // función para aumentar la cantidad
    setQuantity(prevQuantity => {   // utilizo el valor anterior de la cantidad para calcular el nuevo valor
      const newQuantity = prevQuantity + 1; 
      onQuantityChange(newQuantity); // llamo a la función onQuantityChange con el nuevo valor de cantidad
      return newQuantity; 
    });
  };

  const decreaseQuantity = () => {              // función para disminuir la cantidad
    setQuantity(prevQuantity => { 
      if (prevQuantity > 1) {                   // verifico que la cantidad no sea menor que 1 antes de disminuirla
        const newQuantity = prevQuantity - 1; 
        onQuantityChange(newQuantity);          // llamo a la función onQuantityChange con el nuevo valor de cantidad
        return newQuantity; 
      }
      return prevQuantity;                      // si la cantidad es 1, no permito que baje más
    });
  };

  return (
    <div className="quantity-selector"> 
      <button onClick={decreaseQuantity}>-</button> 
      <span>{quantity}</span> 
      <button onClick={increaseQuantity}>+</button> 
    </div>
  );
};

export default QuantitySelector;
