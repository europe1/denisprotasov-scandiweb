import React from 'react';
import { Outlet } from 'react-router-dom';

import { categoriesQuery, currenciesQuery } from './queries';

import { CurrencyContext } from './CurrencyContext';
import { CartContext } from './CartContext';

import Attributes from './Attributes';
import Header from './Header';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      selectedCurrency: 'USD',
      cartProducts: {}
    };

    this.selectCurrency = newCurrency => {
      this.setState({selectedCurrency: newCurrency});
    };

    this.addToCart = product => {
      const cartProductId = product.product.id + product.attributes.id();
      this.setState((oldState) => {
        if (oldState.cartProducts[cartProductId]) {
          oldState.cartProducts[cartProductId].quantity += 1;
        } else {
          oldState.cartProducts[cartProductId] = {
            id: cartProductId,
            attributes: new Attributes(),
            product: product.product,
            quantity: 1
          };
          oldState.cartProducts[cartProductId].attributes.fromAttributes(
            product.attributes.getAttributes());
        }

        return {cartProducts: oldState.cartProducts};
      });
    }

    this.removeFromCart = product => {
      const cartProductId = product.product.id + product.attributes.id();
      this.setState((oldState) => {
        oldState.cartProducts[cartProductId].quantity -= 1;
        if (oldState.cartProducts[cartProductId].quantity <= 0) {
          delete oldState.cartProducts[cartProductId];
        }
        return {cartProducts: oldState.cartProducts};
      });
    }
  }

  componentDidMount() {
    categoriesQuery(data => this.updateCategories(data.data.categories));
    currenciesQuery(data => {
      this.setState({selectedCurrency: data.data.currencies[0].label});
    });
  }

  updateCategories(categories) {
    this.setState({
      categories: categories,
    });
  }

  render() {
    return (
      <CurrencyContext.Provider value={{currency: this.state.selectedCurrency, selectCurrency: this.selectCurrency}}>
        <CartContext.Provider value={{products: this.state.cartProducts, addToCart: this.addToCart, removeFromCart: this.removeFromCart}}>
          <Header categories={this.state.categories} />
          <div className='page'>
            <Outlet />
          </div>
        </CartContext.Provider>
      </CurrencyContext.Provider>
    );
  }
}

export default App;
