import React from 'react';
import { Outlet } from 'react-router-dom';

import { graphQuery } from './helpers';

import { CurrencyContext } from './CurrencyContext';
import { CartContext } from './CartContext';
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
      this.setState((oldState) => {
        oldState.cartProducts[product.product.id] = product;
        return {cartProducts: oldState.cartProducts};
      });
    }

    this.removeFromCart = product => {
      this.setState((oldState) => {
        delete oldState.cartProducts[product.product.id];
        return {cartProducts: oldState.cartProducts};
      });
    }
  }

  componentDidMount() {
    graphQuery('{categories { name }}', data => this.updateCategories(data.data.categories));
    graphQuery('{currencies { label }}', data => {
      this.state.selectedCurrency = data.data.currencies[0].label;
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
