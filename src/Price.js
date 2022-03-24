import React from 'react';
import { CurrencyContext } from './CurrencyContext';

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

export default Price;
