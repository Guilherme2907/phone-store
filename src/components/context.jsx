import React, { Component } from "react";

import { storeProducts, detailProduct } from "../data";

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

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });

    this.setState({ ...this.state, products: tempProducts });
  };

  getItem = id => {
    const product = this.state.products.find(product => product.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState({ ...this.state, detailProduct: product });
  };

  addToCart = id => {
    const product = this.getItem(id);
    product.inCart = true;
    product.count = 1;
    product.total = product.price;
    this.setState(
      { ...this.state, cart: [...this.state.cart, product] },
      () => {
        this.addTotals();
      }
    );
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState({ modalOpen: true, modalProduct: product });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

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
    const product = this.getItem(id);
    product.count += 1;
    product.total = product.price * product.count;
    this.addTotals();
  };

  decrement = id => {
    const product = this.getItem(id);
    product.count -= 1;
    if(product.count === 0) {
      this.removeItem(id);
      return;
    }
    product.total = product.price * product.count;
    this.addTotals();
  };

  removeItem = id => {
    const products = this.state.products;
    let cart = this.state.cart;

    cart = cart.filter(product => product.id !== id);

    const index = products.indexOf(this.getItem(id));
    const product = products[index];
    product.count = 0;
    product.total = 0;
    product.inCart = false;
    this.setState({ ...this.state, products, cart }, () => {
      this.addTotals();
    });
  };

  clearCart = () => {
    this.setState({ ...this.state, cart: [] }, () => {
      this.setProducts();
      this.addTotals();
    });
  };

  addTotals = () => {
    let cartSubTotal = 0;
    this.state.cart.map(product => (cartSubTotal += product.total));
    let cartTax = parseFloat((cartSubTotal * 0.1).toFixed(2));
    let cartTotal = cartSubTotal + cartTax;
    this.setState({ ...this.state, cartSubTotal, cartTax, cartTotal });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
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
