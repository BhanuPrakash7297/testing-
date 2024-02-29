import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/context/auth';
import { SearchProvider } from './components/context/SearchContext';
import { CartProvider } from './components/context/cartContext';
import { CategoriesProvider } from './components/context/categoryContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CategoriesProvider>
      <CartProvider>
        <SearchProvider>

          <BrowserRouter>
            <App />
          </BrowserRouter>


        </SearchProvider>
      </CartProvider>
    </CategoriesProvider>

  </AuthProvider>

);


