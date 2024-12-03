import React from 'react'; 
import { Link } from 'react-router-dom'; 
import { useCart } from './CartContext'; 
import CartWidget from './CartWidget'; 
import Logo from './Logo'; 
import './Navbar.css'; 

const NavBar = () => {
  const { getTotalItemCount } = useCart();
  const cartCount = getTotalItemCount();

  return (
    <nav className="navbar"> 
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <ul className="menu"> 
        <li><Link to="/category/Mieles">Mieles</Link></li>
        <li><Link to="/category/Jalea Real">Jalea Real</Link></li>
        <li><Link to="/category/Propóleo">Propóleo</Link></li>
      </ul>
      <div className="cart-section">
        <CartWidget cartCount={cartCount} />
        {cartCount > 0 && (
          <Link to="/checkout" className="checkout-link">
            Finalizar Compra
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
