import React from 'react';
import { CurrencyContext } from './CurrencyContext';
import { currenciesQuery } from './queries';

import CurrencyIcon from './CurrencyIcon';

class CurrencySwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      open: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.chooseCurrency = this.chooseCurrency.bind(this);
  }

  componentDidMount() {
    currenciesQuery(data => {
      this.state.currencies = data.data.currencies;
    });
  }

  handleClick() {
    this.setState((oldState) => {return {open: !oldState.open}});
  }

  chooseCurrency(label) {
    this.context.selectCurrency(label);
  }

  render() {
    let selectedLabel = this.context.currency;
    let symbol = '$';
    let selectedCurrency = this.state.currencies.find(currency => currency.label === selectedLabel);
    if (selectedCurrency) {
      symbol = selectedCurrency.symbol;
    }

    return (
      <div onClick={this.handleClick} className='currency-wrapper'>
        <CurrencyIcon symbol={symbol} open={this.state.open} />
        {this.state.open ? (
          <div className='currency-list-wrapper'><div className='currency-list'>
            {this.state.currencies.map(currency => (
              <div className='currency-entry' key={currency.label} onClick={() => this.chooseCurrency(currency.label)}>
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
