import React from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

import Attribute from './Attribute';
import CartGallery from './CartGallery';
import CartTotal from './CartTotal';
import CartPrice from './CartPrice';

class Cart extends React.Component {
  addProduct(cartProduct) {
    this.context.addToCart(cartProduct);
  }

  removeProduct(cartProduct) {
    this.context.removeFromCart(cartProduct);
  }

  render() {
    let products = Object.values(this.context.products);
    let length = '';
    if (products.length > 0) {
      length += ', ';
      length += products.length.toString();
      length += products.length === 1 ? ' item' : ' items';
    }

    const attributes = (cartProduct) => {
      return cartProduct.attributes.getAttributes().map((attribute) => (
        <Attribute name={attribute.name} key={attribute.name}
          selectedAttribute={attribute.value} values={attribute.values}
          type={attribute.type} className='cart-attribute'
          selectAttribute={(name, value) => {}} />
      ));
    };

    return (
      <div>
        <div className={'cart-title' + (this.props.isOverlay ? ' cart-overlay' : '')}>
          {this.props.isOverlay ? (<span><b>My Bag</b>{length}</span>) : (<h1 className='cart-title-big'>Cart</h1>)}
        </div>
        <div className={'cart-items' + (this.props.isOverlay ? ' cart-overlay' : '')}>
          {products.map((cartProduct) => (
            <div className='cart-item' key={cartProduct.product.id}>
              <div className='cart-left'>
                <div className='cart-brand'>{cartProduct.product.brand}</div>
                <div className='cart-name'>{cartProduct.product.name}</div>
                <CartPrice prices={cartProduct.product.prices} />
                <div className='cart-attributes'>
                  {attributes(cartProduct)}
                </div>
              </div>
              <div className='cart-middle'>
                <div className='cart-change-quantity' onClick={() => this.addProduct(cartProduct)}>+</div>
                <div className='cart-quantity'>{cartProduct.quantity}</div>
                <div className='cart-change-quantity' onClick={() => this.removeProduct(cartProduct)}>-</div>
              </div>
              <div className='cart-right'>
                <CartGallery images={cartProduct.product.gallery} />
              </div>
            </div>
          ))}
        </div>
        {this.props.isOverlay && products.length > 0 ? <CartTotal cartProducts={products} /> : undefined}
        {products.length === 0 ? (<div className='cart-empty'>Empty</div>) : undefined}
        {this.props.isOverlay && (
          <div className='cart-buttons'>
            <Link className='cart-button' to='/cart' onClick={this.props.toggleOverlay}>View bag</Link>
            <Link className='cart-button checkout' to='/checkout' onClick={this.props.toggleOverlay}>Checkout</Link>
          </div>
        )}
      </div>
    );
  }
}
Cart.contextType = CartContext;

export default Cart;
