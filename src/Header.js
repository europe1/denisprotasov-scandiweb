import React from 'react';

import CurrencySwitcher from './CurrencySwitcher';
import CartIcon from './CartIcon';
import Cart from './Cart';
import Overlay from './Overlay';
import HeaderCategory from './HeaderCategory';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false
    };

    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  toggleOverlay() {
    this.setState((oldState) => {
      return {overlay: !oldState.overlay};
    });
  }

  render() {
    return (
      <div className='header'>
        <div className='categories'>
          {this.props.categories.map((category, index) =>
            <HeaderCategory category={category} key={index} />
          )}
        </div>
        <div className='logo-wrapper'>
          <img className='logo' src={require('./logo.png')} />
        </div>
        <div className='right-side'>
          <CurrencySwitcher />
          <CartIcon onClick={this.toggleOverlay} />
          {this.state.overlay ? (
            <Overlay toggleOverlay={this.toggleOverlay}>
              <Cart isOverlay={true} toggleOverlay={this.toggleOverlay} />
            </Overlay>
          ) : undefined}
        </div>
      </div>
    );
  }
}

export default Header;
