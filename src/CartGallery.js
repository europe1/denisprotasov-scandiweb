import React from 'react';

class CartGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      arrowsVisible: false
    };

    this.changeIndex = this.changeIndex.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  changeIndex(by) {
    const maxIndex = this.props.images.length - 1;

    this.setState((oldState) => {
      let newIndex = oldState.currentIndex + by;
      if (newIndex > maxIndex) newIndex = 0;
      else if (newIndex < 0) newIndex = maxIndex;
      return {currentIndex: newIndex};
    });
  }

  handleMouseOver() {
    this.setState({arrowsVisible: true});
  }

  handleMouseLeave() {
    this.setState({arrowsVisible: false});
  }

  render() {
    return (
      <div className='cart-gallery' onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        {this.state.arrowsVisible && (
          <span className='arrow-left' onClick={() => this.changeIndex(-1)}>
            <img className='gallery-arrow' src={require('./arrow-left.png')} alt='<' />
          </span>
        )}
        <img className='cart-image' src={this.props.images[this.state.currentIndex]} alt={'Product image ' + this.state.currentIndex.toString()} />
        {this.state.arrowsVisible && (
          <span className='arrow-right' onClick={() => this.changeIndex(1)}>
            <img className='gallery-arrow' src={require('./arrow-right.png')} alt='>' />
          </span>
        )}
      </div>
    );
  }
}

export default CartGallery;
