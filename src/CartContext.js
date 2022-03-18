import React from 'react';

export const CartContext = React.createContext({products: [], addToCart: () => {}, removeFromCart: () => {}});
