import React from 'react';
import { CartContext } from './CartContext';

class AddToCartButton extends React.Component {
  render() {
    let addToCart = this.context.addToCart;

    return (
      <button disabled={!this.props.active} className='add-to-cart'
        onClick={() => addToCart(this.props.cartProduct)}>{this.props.active ? 'Add to cart' : 'Out of stock'}</button>
    );
  }
}
AddToCartButton.contextType = CartContext;

export default AddToCartButton;
