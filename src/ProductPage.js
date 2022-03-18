import React from 'react';
import { useParams } from 'react-router-dom';
import { graphQueryVars } from './helpers';
import { CurrencyContext } from './CurrencyContext';
import { CartContext } from './CartContext';
import Attribute from './Attribute';

function Product() {
  let params = useParams();
  return <ProductPage productId={params.productId} />;
}

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      selectedAttributes: {},
      productLoaded: false
    }

    this.selectAttribute = this.selectAttribute.bind(this);
  }

  componentDidMount() {
    const productId = this.props.productId;
    graphQueryVars('query GetProduct($id: String!){product(id: $id)' +
    '{name gallery description brand inStock attributes {name type items {value}} prices {amount currency{symbol label}}}}',
      {id: productId}, data => this.updateProduct(data.data.product));
  }

  updateProduct(product) {
    let selectedAttributes = {};
    if (product.attributes) {
      product.attributes.forEach((attribute) => {
        selectedAttributes[attribute.name] = {
          name: attribute.name,
          type: attribute.type,
          value: attribute.items[0].value,
          values: attribute.items.map(item => item.value)
        }
      });
    }

    product.id = this.props.productId;

    this.setState({
      product: product,
      productLoaded: true,
      selectedAttributes: selectedAttributes
    });
  }

  selectAttribute(name, value) {
    this.setState((oldState) => {
      oldState.selectedAttributes[name].value = value;
      return {selectedAttributes: oldState.selectedAttributes};
    });
  }

  render() {
    if (!this.state.productLoaded) return null;

    const attributes = [];
    if (this.state.product.attributes) {
      this.state.product.attributes.forEach((attribute) => {
        attributes.push(
          <FullAttribute name={attribute.name} key={attribute.name}
            selectedAttribute={this.state.selectedAttributes[attribute.name].value}
            values={attribute.items.map((item) => item.value)} type={attribute.type}
            selectAttribute={this.selectAttribute} />
        );
      });
    }

    return (
      <div className='product-page'>
        <ImageGallery images={this.state.product.gallery} />
        <div className='product-description'>
          <h1 className='product-brand'>{this.state.product.brand}</h1>
          <h2 className='product-name'>{this.state.product.name}</h2>
          {attributes}
          <Price prices={this.state.product.prices} />
          <AddToCartButton active={this.state.product.inStock} cartProduct={{product: this.state.product, attributes: this.state.selectedAttributes, quantity: 1}} />
          <Description text={this.state.product.description} />
        </div>
      </div>
    );
  }
}

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedImage: 0};
    this.selectImage = this.selectImage.bind(this);
  }

  selectImage(index) {
    this.setState({selectedImage: index});
  }

  render() {
    return (
      <div className='product-images'>
        <div className='thumbnails'>
          {this.props.images.map((imageLink, index) => (
            <div className='product-image-thumb' style={{backgroundImage: 'url("' + imageLink + '")'}}
              key={'image' + index.toString()} onClick={this.selectImage.bind(this, index)}>
              <div className='dummy'></div>
            </div>
          ))}
        </div>
        <div className='pdp-image' style={{backgroundImage: 'url("' + this.props.images[this.state.selectedImage] + '")'}}>
          <div className='dummy-wide'></div>
        </div>
      </div>
    );
  }
}

class FullAttribute extends Attribute {
  render() {
    let attributes = this.createAttributes();

    return (
      <div className='attribute'>
        <p className='attribute-name'>{this.props.name}:</p>
          <div className='attribute-values'>
            {attributes}
          </div>
      </div>
    );
  }
}

class Price extends React.Component {
  render() {
    const price = this.props.prices.find((price) => price.currency.label === this.context.currency);

    return (
      <div className='price-container'>
        <div className='attribute-name'>Price:</div>
        <div className='price'>{price.currency.symbol}{price.amount}</div>
      </div>
    );
  }
}
Price.contextType = CurrencyContext;

class AddToCartButton extends React.Component {
  render() {
    let addToCart = this.context.addToCart;

    return (
      <button disabled={!this.props.active} className='add-to-cart'
        onClick={() => addToCart(this.props.cartProduct)}>Add to cart</button>
    );
  }
}
AddToCartButton.contextType = CartContext;

class Description extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.props.text }} className='description'></div>
    );
  }
}

export default Product;
