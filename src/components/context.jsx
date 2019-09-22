import React, { Component } from "react";

import { storeProducts, detailProduct } from "../data";

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  state = { products: [], detailProduct };

  componentDidMount() {
    this.setProducts();
  }

  handleDetail = () => {
    console.log("Hello from detailProduct");
  };

  handleAddToCart = () => {
    console.log("Hello from add to cart");
  };

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });

    this.setState(() => {
      return { products: tempProducts };
    });
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

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          handleAddToCart: this.handleAddToCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
