import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { graphQuery } from './helpers';
import { CurrencyContext } from './CurrencyContext';
import { CartContext } from './CartContext';

import 'animate.css';

function Category() {
  let params = useParams();
  return <ProductList categoryName={params.categoryName} />;
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    graphQuery('{categories { name products {id name gallery description brand inStock attributes {name type items {value}} prices {amount currency{symbol label}}}}}',
      data => this.updateProducts(data.data.categories));
  }

  updateProducts(allProducts) {
    this.setState({products: allProducts});
  }

  render() {
    let products = [];
    if (this.state.products.length > 0) {
      let category = this.state.products.find(({name}) => name === this.props.categoryName) ||
        this.state.products.find(({name}) => name === 'all');
      products = category.products;
    }

    let currency = this.context.currency;

    return (
      <div>
        <h1 className='category-name'>{this.props.categoryName}</h1>
        <div className='products'>
          {products.map((product) => (
            <Product product={product} active={product.inStock} currency={currency} key={product.id} />
          ))}
        </div>
      </div>
    );
  }
}
ProductList.contextType = CurrencyContext;

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
    
    const attributes = {};
    if (this.props.product.attributes) {
      this.props.product.attributes.forEach((attribute) => {
        attributes[attribute.name] = {
          name: attribute.name,
          type: attribute.type,
          value: attribute.items[0].value,
          values: attribute.items.map(item => item.value)
        }
      });
    }

    const cartProduct = {
      product: this.props.product,
      quantity: 1,
      attributes: attributes
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
      <Link to={active ? '/product/' + this.props.product.id : ''} onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave} className={'product' + (active ?  ' hover' : ' no-stock')}>
        <div className='product-image' style={{backgroundImage: 'url(' + this.props.product.gallery[0] + ')'}}>
          <div className='dummy'></div>
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

export default Category;
