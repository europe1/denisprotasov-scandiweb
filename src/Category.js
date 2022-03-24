import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoryQuery } from './queries';
import { CurrencyContext } from './CurrencyContext';
import { CartContext } from './CartContext';

import Attributes from './Attributes';
import Product from './Product';

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

  componentDidUpdate() {
    categoryQuery(this.props.categoryName, data => this.updateProducts(data.data.category.products));
  }

  updateProducts(allProducts) {
    this.setState({products: allProducts});
  }

  render() {
    let products = this.state.products;

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

export default Category;
