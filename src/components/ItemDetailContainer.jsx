import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../firebaseConfig';
import QuantitySelector from './QuantitySelector';
import { useCart } from './CartContext';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const { itemId } = useParams(); // Leo el parámetro del ID
  const [product, setProduct] = useState(null); // estado para el producto
  const [loading, setLoading] = useState(true); // estado para manejar la carga
  const [quantity, setQuantity] = useState(1); // cantidad seleccionada por el usuario
  const { addItemToCart } = useCart(); // función para agregar productos al carrito

  useEffect(() => {
    console.log('ID recibido desde la URL:', itemId);
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // realizar la consulta para buscar el producto por el campo id
        const q = query(collection(db, 'productos'), where('id', '==', Number(itemId)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0]; // Tomo el primer resultado
          console.log('Documento encontrado:', docData.data());
          setProduct({ id: docData.id, ...docData.data() });
        } else {
          console.error('Producto no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      // verificar si la cantidad solicitada está disponible en el stock
      if (quantity <= product.stock) {
        addItemToCart(product, quantity);
      } else {
        alert(`Solo hay ${product.stock} unidades disponibles.`);
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>; // muestro mensaje de carga mientras se obtiene el producto
  }

  return (
    <div className="item-detail-container">
      {product ? (
        <div className="product-detail">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info">
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Precio: ${product.price}</p>
            <p><strong>Stock disponible: </strong>{product.stock}</p> {/* muestro stock disponible */}
            <QuantitySelector
              initialQuantity={quantity}
              onQuantityChange={handleQuantityChange}
              maxQuantity={product.stock} // limitar la cantidad máxima según el stock
            />
            <button 
              onClick={handleAddToCart} 
              className="add-to-cart-btn" 
              disabled={quantity > product.stock} // Se deshabilitar si la cantidad seleccionada es mayor al stock
            >
              {quantity > product.stock ? 'Sin stock suficiente' : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      ) : (
        <p>Producto no encontrado</p> // muestro mensaje si no se encuentra el producto
      )}
    </div>
  );
};

export default ItemDetailContainer;
