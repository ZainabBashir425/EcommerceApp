import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const CartContext = createContext();

// Provide Context
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, delta) => {
    setCartItems(prevItems => 
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
    
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingProductIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingProductIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingProductIndex].quantity += quantity;
        return newItems;
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const getCartItemQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, updateQuantity, addToCart, removeFromCart,totalQuantity,getCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
