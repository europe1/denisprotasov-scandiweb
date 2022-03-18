import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App';
import Category from './ProductList';
import Product from './ProductPage';
import Cart from './Cart';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='cart' element={<Cart isOverlay={false} />} />
        <Route path='product/:productId' element={<Product />} />
        <Route path=':categoryName' element={<Category />} />
      </Route>
    </Routes>
  </BrowserRouter>
, document.getElementById('root'));
