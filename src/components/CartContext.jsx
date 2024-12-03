import React, { createContext, useContext, useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import db from '../firebaseConfig';

//contexto para el carrito de compras para compartir el estado del carrito entre componentes
const CartContext = createContext();

// Hook personalizado para acceder al contexto del carrito en cualquier componente
export const useCart = () => {
  return useContext(CartContext);
};

// proveedor del contexto (para que todos los componentes tengan acceso al carrito)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // estado del carrito

  // función para agregar productos al carrito
  const addItemToCart = (product, quantity) => {
    setCart((prevCart) => {
      // verifico si el producto ya existe en el carrito
      const existingItem = prevCart.find(item => item.id === product.id);

      // si producto ya existe, valido que haya suficiente stock antes de actualizar la cantidad
      if (existingItem) {
        if (existingItem.quantity + quantity > product.stock) {
          alert('No hay suficiente stock para agregar más de este producto');
          return prevCart; // no se agrega más si excede el stock
        }
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity } // ssuma cantidad si hay stock suficiente
            : item
        );
      } else {
        // si el producto no existe, solo se agrega si el stock lo permite
        if (quantity > product.stock) {
          alert('No hay suficiente stock para este producto');
          return prevCart; // no agregar si no hay suficiente stock
        }
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // vaciar el carrito después de la compra
  const clearCart = () => {
    setCart([]);
  };

  // función para actualizar el stock en Firebase después de la compra
  const updateStockAfterPurchase = async () => {
    try {
      for (const item of cart) {
        const productRef = doc(db, 'productos', item.id.toString()); // btener referencia del producto
        const productSnap = await getDoc(productRef); // obtener el documento del producto

        if (productSnap.exists()) {
          const productData = productSnap.data();
          const updatedStock = productData.stock - item.quantity; // restar la cantidad comprada

          if (updatedStock >= 0) {
            // actualizo stock en Firebase
            await updateDoc(productRef, { stock: updatedStock });
          } else {
            console.error('No hay suficiente stock en la base de datos');
          }
        }
      }
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
    }
  };

  // función para la cantidad total de productos en el carrito
  const getTotalItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, clearCart, getTotalItemCount, updateStockAfterPurchase }}>
      {children}
    </CartContext.Provider>
  );
};
