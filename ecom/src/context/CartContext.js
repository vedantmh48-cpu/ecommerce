/**
 * CartContext — Global Cart State Management
 * 
 * Uses React Context + useReducer for predictable state management.
 * Cart data persists across page reloads via localStorage.
 * 
 * Actions:
 *  - ADD_TO_CART: Add item or increment quantity
 *  - REMOVE_FROM_CART: Remove item entirely
 *  - UPDATE_QUANTITY: Change quantity for a specific item
 *  - CLEAR_CART: Empty the cart
 */

import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create context
const CartContext = createContext();

// Load cart from localStorage (persistence across reloads)
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("ecom_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

// Initial state
const initialState = {
  items: loadCartFromStorage(),
};

// Reducer function — handles all cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // Check if item already exists in cart
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        // Increment quantity if item exists
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems };
      }
      // Add new item with quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove if quantity is 0 or negative
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

// Provider component — wraps the entire app
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem("ecom_cart", JSON.stringify(state.items));
  }, [state.items]);

  // Derived calculations
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100

  // --- GIFT CARD / DISCOUNT SYSTEM ---
  // Tiers based on subtotal BEFORE discount
  let discountPercent = 0;
  let discountLabel = "";
  let nextTierAmount = null;
  if (subtotal >= 200) {
    discountPercent = 20;
    discountLabel = "20% Off (Platinum)";
  } else if (subtotal >= 100) {
    discountPercent = 15;
    discountLabel = "15% Off (Gold)";
    nextTierAmount = 200;
  } else if (subtotal >= 50) {
    discountPercent = 10;
    discountLabel = "10% Off (Silver)";
    nextTierAmount = 100;
  } else {
    nextTierAmount = 50;
  }
  const discount = subtotal * (discountPercent / 100);
  const total = subtotal - discount + tax + shipping; // discount subtracted
  const qualifiesForGift = discountPercent > 0;

  // Context value with state + dispatch + derived values
  const value = {
    items: state.items,
    cartCount,
    subtotal,
    tax,
    shipping,
    discount,
    discountPercent,
    discountLabel,
    nextTierAmount,
    qualifiesForGift,
    total,
    dispatch,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook for consuming cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;