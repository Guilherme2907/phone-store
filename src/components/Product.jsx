import React, { Component } from "react";
// import { ProductConsumer } from "./context";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class Product extends Component {
  render() {
    const { img, id, title, price, inCart } = this.props.product;
    return (
      <ProductWrapper className="col-9 col-md-6 col-lg-3 mx-auto my-3">
        <div className="card">
          <div className="img-container p-5">
            <Link to="/details">
              <img
                src={img}
                alt="product"
                className="card-img-top"
                onClick={() => alert("Hello")}
              />
            </Link>

            <button
              className="cart-btn"
              disabled={inCart}
              onClick={() => alert(`add to cart ${id}`)}
            >
              {inCart ? (
                <p className="text-capitalize mb-0">in cart</p>
              ) : (
                <i className="fas fa-cart-plus" />
              )}
            </button>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <p className="align-self-center mb-0">{title}</p>
            <h5 className="text-blue font-italic mb-0">
              <span className="mr-1">$</span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all .5s linear;
  }

  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all .5s linear;
  }

  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgb(247, 247, 247);
    }
  }

  .img-container {
    position: relative;
    overflow: hidden;
    .card-img-top {
      transition: all 0.5s linear;
    }
    &:hover .card-img-top {
      transform: scale(1.2);
    }

    .cart-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: .2rem .4rem;
        background: var(--lightBlue);
        border: none;
        color: var(--mainWhite);
        border-radius: .5rem 0 0 0;
        transform: translate(100%,100%);
        transition: all 0.5s linear;
    }

    &:hover .cart-btn {
        transform: translate(0,0);
    }
  }
`;
