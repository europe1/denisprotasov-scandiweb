import React from 'react';

class Attribute extends React.Component {
  createAttributes() {
    let selectAttribute = this.props.selectAttribute;

    const attributes = [];
    this.props.values.forEach((value) => {
      attributes.push(
        <div className={'attribute-value-' + this.props.type + (this.props.selectedAttribute === value ? ' selected' : '')}
          key={value} onClick={() => selectAttribute(this.props.name, value)}
          style={{backgroundColor: (this.props.type === 'swatch' ? value : 'none')}}>
          {this.props.type === 'text' && value}
        </div>
      );
    });

    return attributes;
  }

  render() {
    const attributes = this.createAttributes();

    return (
      <div className={this.props.className}>{attributes}</div>
    );
  }
}

export default Attribute;
