import React from 'react';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedImage: 0};
    this.selectImage = this.selectImage.bind(this);
  }

  selectImage(index) {
    this.setState({selectedImage: index});
  }

  render() {
    return (
      <div className='product-images'>
        <div className='thumbnails'>
          {this.props.images.map((imageLink, index) => (
            <img className='product-image-thumb' src={imageLink}
              key={'image' + index.toString()} onClick={this.selectImage.bind(this, index)} />
          ))}
        </div>
        <img className='pdp-image' src={this.props.images[this.state.selectedImage]} />
      </div>
    );
  }
}

export default ImageGallery;
