import React from 'react';
import { CurrencyContext } from './CurrencyContext';

class CartPrice extends React.Component {
  render() {
    let currency = this.context.currency;
    let price = this.props.prices.find(price => price.currency.label === currency);

    return (
      <div className='cart-price'>{price.currency.symbol}{price.amount}</div>
    );
  }
}
CartPrice.contextType = CurrencyContext;

export default CartPrice;
