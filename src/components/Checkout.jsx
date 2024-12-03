import React from 'react';
import { useCart } from './CartContext';
import { collection, addDoc } from 'firebase/firestore';
import db from '../firebaseConfig';
import './Checkout.css';

const Checkout = () => {
  const { cart, updateStockAfterPurchase, clearCart } = useCart();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío. Agrega productos para continuar.");
      return;
    }

    try {
      // creación de orden de compra
      const order = {
        items: cart.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        date: new Date().toISOString(),
      };

      // guardar la orden en Firebase
      const docRef = await addDoc(collection(db, 'orders'), order);
      console.log("Orden creada con ID:", docRef.id);

      // vctualizar el stock en Firebase
      await updateStockAfterPurchase();

      // vaciar el carrito
      clearCart();

      alert(`¡Compra finalizada! ID de la orden: ${docRef.id}`);
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Hubo un problema al procesar tu compra. Intenta nuevamente.");
    }
  };

  if (cart.length === 0) {
    return <div>No hay productos en el carrito.</div>;
  }

  return (
    <div className="checkout">
      <h2>Resumen de la Compra</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.title} - Cantidad: {item.quantity} - Precio: ${item.price}
          </li>
        ))}
      </ul>
      <p>
        <strong>Total:</strong> $
        {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
      </p>
      <button onClick={handleCheckout}>Finalizar Compra</button>
    </div>
  );
};

export default Checkout;
