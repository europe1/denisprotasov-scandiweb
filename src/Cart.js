import React from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { CurrencyContext } from './CurrencyContext';
import Attribute from './Attribute';

class Cart extends React.Component {
  addProduct(cartProduct) {
    cartProduct.quantity += 1;
    this.context.addToCart(cartProduct);
  }

  removeProduct(cartProduct) {
    cartProduct.quantity -= 1;
    if (cartProduct.quantity <= 0) {
      this.context.removeFromCart(cartProduct);
    } else {
      this.context.addToCart(cartProduct);
    }
  }

  selectAttribute(productId, name, value) {
    const product = this.context.products[productId];
    product.attributes[name].value = value;
    this.context.addToCart(product);
  }

  render() {
    let products = Object.values(this.context.products);
    let length = '';
    if (products.length > 0) {
      length += ', ';
      length += products.length.toString();
      length += products.length === 1 ? 'item' : 'items';
    }

    const attributes = (cartProduct) => {
      return Object.values(cartProduct.attributes).map((attribute) => (
        <Attribute name={attribute.name} key={attribute.name}
          selectedAttribute={attribute.value} values={attribute.values}
          type={attribute.type} className='cart-attribute'
          selectAttribute={(name, value) => this.selectAttribute(cartProduct.product.id, name, value)} />
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
                  {this.props.isOverlay ? attributes(cartProduct)[0] : attributes(cartProduct)}
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

class CartGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      arrowsVisible: false
    };

    this.changeIndex = this.changeIndex.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  changeIndex(by) {
    const maxIndex = this.props.images.length - 1;

    this.setState((oldState) => {
      let newIndex = oldState.currentIndex + by;
      if (newIndex > maxIndex) newIndex = 0;
      else if (newIndex < 0) newIndex = maxIndex;
      return {currentIndex: newIndex};
    });
  }

  handleMouseOver() {
    this.setState({arrowsVisible: true});
  }

  handleMouseLeave() {
    this.setState({arrowsVisible: false});
  }

  render() {
    return (
      <div className='cart-gallery' onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        {this.state.arrowsVisible && (
          <span className='arrow-left' onClick={() => this.changeIndex(-1)}>
            <img className='gallery-arrow' src={require('./arrow-left.png')} />
          </span>
        )}
        <img className='cart-image' src={this.props.images[this.state.currentIndex]} />
        {this.state.arrowsVisible && (
          <span className='arrow-right' onClick={() => this.changeIndex(1)}>
            <img className='gallery-arrow' src={require('./arrow-right.png')} />
          </span>
        )}
      </div>
    );
  }
}

export default Cart;
