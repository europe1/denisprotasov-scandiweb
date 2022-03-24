import React from 'react';
import { CurrencyContext } from './CurrencyContext';

class CartTotal extends React.Component {
  render() {
    let currency = this.context.currency;
    let total = 0;
    let formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: currency});

    this.props.cartProducts.forEach((cartProduct) => {
      let price = cartProduct.product.prices.find((price) => price.currency.label === currency);
      total += price.amount * cartProduct.quantity;
    });

    return (
      <div className='cart-total'>
        <div className='total-text'>Total</div>
        <div className='total-amount'>{formatter.format(total)}</div>
      </div>
    );
  }
}
CartTotal.contextType = CurrencyContext;

export default CartTotal;
