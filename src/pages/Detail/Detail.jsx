import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { decreaseNumberAction, getProductCartAction, getProductCartApi, getProductDetailAction, getProductDetailApi, increaseNumberAction, submitToCartAction } from "../../redux/reducers/productReducer";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJson,
  http,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../util/tool";
import { history } from "../../index";
import { number } from "yup";
export default function Detail() {
  const { productDetail} = useSelector(
    (state) => state.productReducer
  );
  console.log(productDetail)

  const { userLogin } = useSelector((state) => state.userReducer);



  const dispatch = useDispatch();
  const params = useParams();

  const renderSize = () => {
    return productDetail?.size?.map((item, index) => {
      return (
        <div key={index}>
          <button
            className="btn btn-dark bg-secondary me-2"
            onClick={() => {
              //  const action = {
              //   type: "productReducer/getProductCartAction",
              //   payload: {size: item}
              // };
              // console.log(action);
              // dispatch(action);
            }}
          >
            {item}
          </button>
        </div>
      );
    });
  };

  useEffect(() => {
    //callapi
    let { id } = params;

    //Dispatch action thunk
    //Bước 1: Dispatch action thunk
    const action = getProductDetailApi(id);

    dispatch(action);
  }, [params.id]);

  const detailRender = () => {
    return productDetail.relatedProducts?.map((item, index) => {
      return (
        <div className="col-4" key={index}>
          <div className="card">
            <img src={item.image} alt={item.name} />
            {console.log(item.image)}
            <div className="card-body bg-dark text-white">
              <p>{item.name}</p>
              <p>{item.price}</p>
              <NavLink className="btn btn-secondary" to={`/detail/${item.id}`}>
                View detail
              </NavLink>
            </div>
          </div>
        </div>
      );
    });
  };

  const errorCart = () => {
    if (!getStore(ACCESS_TOKEN)) {
      alert("Đăng nhập để vào trang này!");
      return history.push("/login");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="item bg-light">
            <img
              className="w-100"
              src={productDetail.image}
              alt={productDetail.name}
            />
          </div>
        </div>
        <div className="col-6 ms-5">
          <div className="text-start">
            <h1 className="">{productDetail.name}</h1>
            <p>{productDetail.description}</p>
            <p className="text-success">Available Size</p>
            <div className="d-flex">{renderSize()}</div>
            <p className="text-danger mt-2 mb-0">{productDetail.price}$</p>
            <div>
              <button
                className="btn btn-primary text-white"
                onClick={() => {
                dispatch(increaseNumberAction(productDetail))
                }
                }
              >
                +
              </button>
              <span className="mx-2">{productDetail.quantity}</span>
              <button
                className="btn btn-primary text-white"
                onClick={() => {
                  dispatch(decreaseNumberAction(productDetail))
                }
              }
              >
                -
              </button>
            </div>
            <button
              style={{
                background:
                  "linear-gradient(270deg, rgba(62, 32, 248, 0.9) 5.14%, #D017EE 89.71%)",
              }}
              className="btn text-white mt-2"
             onClick={() => {
              dispatch(submitToCartAction(productDetail))
             }}
            >
              {userLogin ? (
                <span>
                 
                    <span style={{ color: "white" }}>Add To Cart</span>
                 
                </span>
              ) : (
                <span onClick={() => errorCart()} style={{ color: "white" }}>
                  Add To Cart
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <h3 className="mt-3">-Related Product-</h3>
      <div className="row mt-3">
        {/*toán tử ?: optional chaining */}
        {detailRender()}
      </div>
    </div>
  );
}
