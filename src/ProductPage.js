import React from 'react';
import { useParams } from 'react-router-dom';
import { productQuery } from './queries';

import Attributes from './Attributes';
import FullAttribute from './FullAttribute';
import Price from './Price';
import AddToCartButton from './AddToCartButton';
import Description from './Description';
import ImageGallery from './ImageGallery';

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
    productQuery(this.props.productId, data => this.updateProduct(data.data.product));
  }

  updateProduct(product) {
    const attributes = new Attributes();
    attributes.fromDB(product.attributes);
    product.id = this.props.productId;

    this.setState({
      product: product,
      productLoaded: true,
      selectedAttributes: attributes
    });
  }

  selectAttribute(name, value) {
    this.setState((oldState) => {
      oldState.selectedAttributes.selectAttribute(name, value);
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
            selectedAttribute={this.state.selectedAttributes.getSelectedAttribute(attribute.name)}
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
          <AddToCartButton active={this.state.product.inStock} cartProduct={{product: this.state.product, attributes: this.state.selectedAttributes}} />
          <Description text={this.state.product.description} />
        </div>
      </div>
    );
  }
}

export default Product;
