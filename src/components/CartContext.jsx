import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase"; // Firebase configuration
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

// Create Context
const CartContext = createContext();

// Provide Context
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from Firebase on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      const querySnapshot = await getDocs(collection(db, "cartItems"));
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCartItems(items);
    };
    fetchCartItems();
  }, []);

  // Function to save cart item to Firebase
  const saveCartItemToFirebase = async (item) => {
    try {
      // Convert item ID to a string when setting the document
      const itemDoc = doc(db, 'cartItems', item.id.toString());
      await setDoc(itemDoc, item);
      console.log('Item saved to Firebase successfully');
    } catch (error) {
      console.error('Error saving item to Firebase:', error);
    }
  };

  // Function to update cart item quantity in Firebase
  const updateCartItemQuantityInFirebase = async (itemId, newQuantity) => {
    try {
      // Convert item ID to a string when updating the document
      const itemDoc = doc(db, 'cartItems', itemId.toString());
      await updateDoc(itemDoc, { quantity: newQuantity });
      console.log('Item quantity updated in Firebase successfully');
    } catch (error) {
      console.error('Error updating item quantity in Firebase:', error);
    }
  };

  // Function to delete cart item from Firebase
  const deleteCartItemFromFirebase = async (itemId) => {
    try {
      // Convert item ID to a string when deleting the document
      const itemDoc = doc(db, 'cartItems', itemId.toString());
      await deleteDoc(itemDoc);
      console.log('Item deleted from Firebase successfully');
    } catch (error) {
      console.error('Error deleting item from Firebase:', error);
    }
  };
  const clearCart = () => setCartItems([]);
  const clearCartInFirebase = async (cartItems) => {
    try {
      const cartRef = collection(db, "cartItems"); // Adjust the path to your Firebase collection
  
      // Loop through each item in the cart and delete it from Firebase
      for (const item of cartItems) {
        const itemId = String(item.id);
        const itemRef = doc(cartRef, itemId); // Assuming each item has a unique id
        await deleteDoc(itemRef);
      }
    } catch (error) {
      console.error("Error clearing cart in Firebase:", error);
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);
      if (existingProduct) {
        const updatedItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
        updateCartItemQuantityInFirebase(product.id, existingProduct.quantity + quantity);
        return updatedItems;
      } else {
        const newItem = { ...product, quantity };
        saveCartItemToFirebase(newItem);
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
    const item = cartItems.find((item) => item.id === id);
    if (item) updateCartItemQuantityInFirebase(id, Math.max(1, item.quantity + delta));
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    deleteCartItemFromFirebase(id);
  };

  const getCartItemQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalQuantity,
        getCartItemQuantity,
        clearCart,
        clearCartInFirebase
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
