import React, { Component } from 'react';
import VariantSelector from './VariantSelector';

var flag="hidden";
class Product extends Component {
  constructor(props) {
    super(props);

    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.state = { selectedOptions: defaultOptionValues };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0]
    let variant = this.state.selectedVariant || this.props.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.props.product.options.map((option) => {
      return (
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      );
    });
    return (
      <div className="Product">
        {
          this.props.product.images.length ? <img id={variant.id} src={variantImage.src} alt={`${this.props.product.title} product shot`} style={{ margin:'auto', borderRadius: '10%', cursor: 'pointer',width:'120px', height: '120px',border:'3px solid #5e5d5d' }}
            onClick={() => this.props.addVariantToCart(variant.id, variantQuantity,this.props.settingValue)}
            onMouseDown={() => this.props.mouseDown(variant.id)}
            onMouseUp={() => this.props.mouseUp(variant.id)}
          /> : null
        }
        <h6 className="Product__title">{this.props.product.title}</h6>
        <span className="Product__title" style={{color: '#ff8080',fontSize:'15px'}}>¥{variant.price}</span>
      </div>
    );
  }
}

export default Product;
