import React from 'react';

import 'animate.css';

class Overlay extends React.Component {
  render() {
    return (
      <div className='overlay' onClick={this.props.toggleOverlay}>
        <div className='overlay-background animate__animated animate__fadeIn'></div>
        <div className='overlay-content animate__animated animate__slideInUp animate__faster'
          onClick={e => e.stopPropagation()}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Overlay;
