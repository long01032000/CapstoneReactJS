import { Carousel } from "antd";
import React from "react";
import { useSelector } from "react-redux";

export default function Slide() {
  const contentStyle = {
    color: "#fff",

    textAlign: "center",
    background: "blue",
  };
  const { arrProduct } = useSelector((state) => state.productReducer);

  const renderSlide = () => {
    return arrProduct.map((prod, index) => {
      return (
        <div className="d-flex" key={index}>
          <div className="w-50 item-left" style={{marginLeft: 100}}>
            <img src={prod.image} alt="..." />
          </div>
          <div className="w-50 item-right" style={{marginRight: 100}}>
            <div style={{ marginTop: "110px" }}>
              <div>
                <h1 className="mb-0">{prod.name}</h1>
                <span className="text-dark">{prod.description}</span>
              </div>
              <button className="btn btn-danger mt-2">Buy now</button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Carousel autoplay>
        {/* <div>
          <h3 style={contentStyle}>
            <div className="d-flex">
              <div className="w-50 item-left">
                <img src="./img/shoe.png" alt="" />
              </div>
              <div className="w-50 item-right">
                <div style={{ marginTop: "110px" }}>
                  <div>
                    <h1 className="mb-0">Product Name</h1>
                    <span className="text-dark">Product Description</span>
                  </div>
                  <button className="btn btn-danger">Buy now</button>
                </div>
              </div>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            {" "}
            <div className="d-flex">
              <div className="w-50 item-left">
                <img src="./img/shoe.png" alt="" />
              </div>
              <div className="w-50 item-right">
                <div style={{ marginTop: "110px" }}>
                  <div>
                    <h1 className="mb-0">Product Name</h1>
                    <span className="text-dark">Product Description</span>
                  </div>
                  <button className="btn btn-danger">Buy now</button>
                </div>
              </div>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            {" "}
            <div className="d-flex">
              <div className="w-50 item-left">
                <img src="./img/shoe.png" alt="" />
              </div>
              <div className="w-50 item-right">
                <div style={{ marginTop: "110px" }}>
                  <div>
                    <h1 className="mb-0">Product Name</h1>
                    <span className="text-dark">Product Description</span>
                  </div>
                  <button className="btn btn-danger">Buy now</button>
                </div>
              </div>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            {" "}
            <div className="d-flex">
              <div className="w-50 item-left">
                <img src="./img/shoe.png" alt="" />
              </div>
              <div className="w-50 item-right">
                <div style={{ marginTop: "110px" }}>
                  <div>
                    <h1 className="mb-0">Product Name</h1>
                    <span className="text-dark">Product Description</span>
                  </div>
                  <button className="btn btn-danger">Buy now</button>
                </div>
              </div>
            </div>
          </h3>
        </div> */}
        {renderSlide()}
      </Carousel>
    </div>
  );
}
