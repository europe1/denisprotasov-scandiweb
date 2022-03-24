import React from 'react';
import { CurrencyContext } from './CurrencyContext';
import { currenciesQuery } from './queries';

import CurrencyIcon from './CurrencyIcon';

class CurrencySwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      mouseOver: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    currenciesQuery(data => {
      this.state.currencies = data.data.currencies;
    });
  }

  handleMouseOver() {
    this.setState({mouseOver: true});
  }

  handleMouseLeave() {
    this.setState({mouseOver: false});
  }

  render() {
    let selectedLabel = this.context.currency;
    let selectCurrencyFunc = this.context.selectCurrency;

    let symbol = '$';
    let selectedCurrency = this.state.currencies.find(currency => currency.label === selectedLabel);
    if (selectedCurrency) {
      symbol = selectedCurrency.symbol;
    }

    return (
      <div onClick={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} className='currency-wrapper'>
        <CurrencyIcon symbol={symbol} mouseOver={this.state.mouseOver} />
        {this.state.mouseOver ? (
          <div className='currency-list-wrapper'><div className='currency-list'>
            {this.state.currencies.map(currency => (
              <div className='currency-entry' key={currency.label} onClick={() => selectCurrencyFunc(currency.label)}>
                {currency.symbol} {currency.label}</div>
            ))}
          </div></div>
        ) : undefined}
      </div>
    );
  }
}
CurrencySwitcher.contextType = CurrencyContext;

export default CurrencySwitcher;
