import React from 'react';

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

export default CurrencyIcon;
