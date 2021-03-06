import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/fetchProducts';
import { addToCart } from '../actions/cart';


class SingleProduct extends Component {
  componentWillMount() {
    this.props.dispatch(fetchProducts(this.props.match.params.productId))
  }
  addProductToCart(product) {
  let replaceDollar = product.price.replace('$', '');
  let newPrice = Number(replaceDollar);
  const newProduct = {
    _id: product._id,
    product_name: product.product_name,
    price: newPrice,
    Category: product.Category,
    quantity: Number(this.refs.quantity.value),
    totalPrice: Number(this.refs.quantity.value) * newPrice
  }
  this.props.dispatch(addToCart(newProduct))
  }
  render() {
    const product = this.props.product.products;
    if(product.length === 0) {
      return null
    }
    let image;
    if(product.productImage) {
      image = product.productImage.replace('\\', '/')
    }
    return (
      <div className="d-flex">
        <div className="mt-5">
          <img className="single-product-img mt-5 pl-5" src={image ? `http://localhost:5000/` + image : "https://picsum.photos/200/100/?random" } alt="product" />
        </div>
        <div className="container mt-5 ml-5 single-product-textcontent">
          <h3 className="mt-5">{product.product_name}</h3>
          <p className="mt-5">Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet,
          när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok.
          Lorem ipsum har inte bara överlevt fem århundraden,
          utan även övergången till elektronisk typografi utan större förändringar.
          Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.</p>
          <div className="d-flex align-items-center mt-3">
            <button className="btn btn-success mt-5 mr-5" onClick={this.addProductToCart.bind(this, product)}>Add To Cart</button>
            <input type="number" ref="quantity" className="col-2 mt-5 mr-5 form-control" defaultValue="1"/>
            <p className="mt-5 single-product-price">{product.price}</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products
})
export default connect(mapStateToProps)(SingleProduct);
