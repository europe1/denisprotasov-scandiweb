import React from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

import Attributes from './Attributes';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mouseOver: false};

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  handleMouseEnter() {
    this.setState({mouseOver: true});
  }

  handleMouseLeave() {
    this.setState({mouseOver: false});
  }

  addToCart(e) {
    e.preventDefault();

    const cartProduct = {
      product: this.props.product,
      attributes: new Attributes(this.props.product.attributes)
    }

    this.context.addToCart(cartProduct);
  }

  render() {
    let active = this.props.active;
    const buyIcon = (
      <div className={this.state.mouseOver ? 'buy-icon-wrapper' : 'buy-icon-wrapper hidden'} onClick={this.addToCart}>
        <img className='buy-icon' src={require('./shopping-cart-white.png')} />
      </div>
    );

    return (
      <Link to={'/product/' + this.props.product.id} onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave} className='product hover'>
        <div className='product-image-container'>
          <img className='product-image' src={this.props.product.gallery[0]} />
          {!active ? (<div className='no-stock-cover'>Out of stock</div>) : buyIcon}
        </div>
        <div className={active ? 'product-list-name' : 'product-list-name no-stock'}>
          {this.props.product.name}
        </div>
        <div className={active ? 'product-price' : 'product-price no-stock'}>
          {this.props.product.prices.find(price => price.currency.label === this.props.currency).currency.symbol}
          {this.props.product.prices.find(price => price.currency.label === this.props.currency).amount}
        </div>
      </Link>
    );
  }
}
Product.contextType = CartContext;

export default Product;
