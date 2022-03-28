import React from 'react';
import { useParams } from 'react-router-dom';
import { categoryQuery } from './queries';
import { CurrencyContext } from './CurrencyContext';

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

  componentDidMount() {
    this.updateProducts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.categoryName !== prevProps.categoryName) this.updateProducts();
  }

  updateProducts() {
    categoryQuery(this.props.categoryName, data => {
      if (data.data.category) this.setState({products: data.data.category.products});
      else this.setState({products: []});
    });
  }

  render() {
    let currency = this.context.currency;

    return (
      <div>
        <h1 className='category-name'>{this.props.categoryName}</h1>
        <div className='products'>
          {this.state.products.map((product) => (
            <Product product={product} active={product.inStock} currency={currency} key={product.id} />
          ))}
        </div>
      </div>
    );
  }
}
ProductList.contextType = CurrencyContext;

export default Category;
