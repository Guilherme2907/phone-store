import React, { Component } from "react";
import { ProductConsumer } from "./context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export default class Details extends Component {
  render() {
    return (
      <div>
        <ProductConsumer>
          {value => {
            const {
              id,
              company,
              img,
              info,
              price,
              title,
              inCart
            } = value.detailProduct;
            return (
              <div className="container py-5">
                {/* start title */}
                <div className="row">
                  <div className="col-10 mx-auto text-center text-blue text-slanted my-5">
                    <h1>{title}</h1>
                  </div>
                </div>
                {/* end title */}
                <div className="row">
                  {/* start image */}
                  <div className="col-9 mx-auto col-md-6 my-3">
                    <img src={img} alt="product" className="img=fluid" />
                  </div>
                  {/* end image */}

                  {/* start info */}
                  <div className="col-9 mx-auto col-md-6 my-3">
                    <h2>model: {title}</h2>
                    <h4 className="text-title text-uppercase mt-3 mb-2 text-muted">
                      made by : {company}
                    </h4>

                    <h4 className="text-blue">
                      <strong>
                        price: <span>$</span>
                        {price}
                      </strong>
                    </h4>
                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                      some info about product
                    </p>
                    <p className="text-muted lead">{info}</p>
                    {/* end info */}

                    {/* buttons */}
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>

                    <ButtonContainer
                      cart
                      disabled={inCart}
                      onClick={() => {
                        value.handleAddToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "in cart" : "add to cart"}
                    </ButtonContainer>
                    {/* end buttons */}
                  </div>
                </div>
              </div>
            );
          }}
        </ProductConsumer>
      </div>
    );
  }
}
