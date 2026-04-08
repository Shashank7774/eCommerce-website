import { createContext, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const removeFromCart = (id) => {
  setCart(cart.filter(p => p._id !== id));
};

  const [cart, setCart] = useState([]);

  const addToCart = (product, qty) => {
    const exists = cart.find(p => p._id === product._id);

    if (exists) {
      setCart(
        cart.map(p =>
          p._id === product._id
            ? { ...p, qty: p.qty + qty }
            : p
        )
      );
    } else {
      setCart([...cart, { ...product, qty }]);
    }
    
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
