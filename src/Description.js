import React from 'react';
import parse from 'html-react-parser';

class Description extends React.Component {
  render() {
    return (
      <div className='description'>{parse(this.props.text)}</div>
    );
  }
}

export default Description;
