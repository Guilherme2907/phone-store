import React, { Component } from "react";

import { storeProducts,detailProduct } from "../data";

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }

  getItem = id => {
    const product = this.state.products.find(product => product.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState({ ...this.state, detailProduct: product });
  };

  handleAddToCart = id => {
    const product = this.getItem(id);
    product.inCart = true;
    product.count = 1;
    product.total = product.price;
    // eslint-disable-next-line
    this.state.cart = [...this.state.cart,product];
  };

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });

    this.setState({ ...this.state, products: tempProducts });
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState({...this.state,modalOpen: true,modalProduct:product});
  }

  closeModal = () => {
    this.setState({...this.state,modalOpen: false});
  }

  // test = () => {
  //   console.log(this.state.products[0].inCart);
  //   console.log(storeProducts[0].inCart);
  //   const temp = {...this.state};
  //   temp.products[0].inCart = true;
  //   this.setState(temp);
  //   console.log(this.state.products[0].inCart);
  //   console.log(storeProducts[0].inCart);
  // }

  increment = id => {
    console.log('increment')
  };
  decrement = id => {
    console.log('decrement')
  };

  removeItem = id => {
    console.log('remove')
  };

  clearCart = () => {
    console.log('clear')
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          handleAddToCart: this.handleAddToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
