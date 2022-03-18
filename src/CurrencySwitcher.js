import React from 'react';
import { CurrencyContext } from './CurrencyContext';
import { graphQuery } from './helpers';

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
    graphQuery('{currencies {label symbol}}', data => {
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
      <div onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} className='currency-wrapper'>
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

class CurrencyIcon extends React.Component {
  render() {
    return (
      <div className='currency-icon-wrapper'>
        <div className='currency-icon'>{this.props.symbol}</div>
        <img className={this.props.mouseOver ? 'arrow-up' : 'arrow-down'} src={require('./arrow.png')} />
      </div>
    );
  }
}

export default CurrencySwitcher;
