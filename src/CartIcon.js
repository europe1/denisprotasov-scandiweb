import React from 'react';
import { CartContext } from './CartContext';

class CartIcon extends React.Component {
  render() {
    let productNum = Object.values(this.context.products).length;

    return (
      <div className='cart-icon-wrapper' onClick={this.props.onClick}>
        <img className='cart-icon' src={require('./shopping-cart.png')} />
        <div className='cart-icon-counter'>{productNum}</div>
      </div>
    );
  }
}
CartIcon.contextType = CartContext;

export default CartIcon;
