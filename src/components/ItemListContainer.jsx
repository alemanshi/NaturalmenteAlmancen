import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import db from '../firebaseConfig';
import Item from './Item';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const { categoryId } = useParams(); // leo el parámetro de la categoría
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const collectionRef = collection(db, "productos"); // conexión con la colección "productos"
        let q = collectionRef;

        if (categoryId) {
          q = query(collectionRef, where("category", "==", categoryId));
        }

        const querySnapshot = await getDocs(q); // obtener documentos de la consulta
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), // traigo los campos del documento
        }));

        setProducts(items); // actualizo estado con los productos
      } catch (error) {
        console.error("Error fetching products from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="item-list-container">
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        products.map(product => (
          <Item
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))
      )}
    </div>
  );
};

export default ItemListContainer;
