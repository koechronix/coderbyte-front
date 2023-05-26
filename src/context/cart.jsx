import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setcart] = useState();

  useEffect(() => {
    const cartLocalStorage = localStorage.getItem('cart')
    if(cartLocalStorage){
        setcart(JSON.parse(cartLocalStorage))
    }
  }, [])
  

  useEffect(() => {
    if (cart) {
        localStorage.setItem('cart',JSON.stringify(cart))
    }
  }, [cart])
  

  return (
    <CartContext.Provider value={{ cart, setcart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
