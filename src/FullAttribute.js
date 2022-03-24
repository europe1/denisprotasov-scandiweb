import Attribute from './Attribute';

class FullAttribute extends Attribute {
  render() {
    let attributes = this.createAttributes();

    return (
      <div className='attribute'>
        <p className='attribute-name'>{this.props.name}:</p>
          <div className='attribute-values'>
            {attributes}
          </div>
      </div>
    );
  }
}

export default FullAttribute;
