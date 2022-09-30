import { Slider } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import FooterHome from "../../components/FooterHome/FooterHome";
import Slide from "../../components/Slide/Slide";
import { getProductApi } from "../../redux/reducers/productReducer";

export default function Home() {
  const { arrProduct } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  //call api
  const getAllProductApi = () => {
    //Sau khi lấy dữ liệu từ api => setState cho arrProduct
    // setArrProduct(result.data.content);
    /* 
              Dạng 1: action là object
              action = {
                  type:'',
                  payload: ''
              }
              Dạng 2: action là callback function
              action = (dispatch2) => {
                  //call api a 
                  //call api b
                  action = {
                      type: '',
                      payload
                  }
                  dispatch2(action)
              }
          */
    const actionThunk = getProductApi();
    dispatch(actionThunk);
  };
  useEffect(() => {
    getAllProductApi();
  }, []);
  const renderProduct = () => {
    return arrProduct.map((prod,index) => {
      return <div className='col-4 mt-2' key={index}>
      <div className='card'>
          <img src={prod.image} alt={prod.name} />
          <div className='card-body bg-dark text-white'>
              <p>{prod.name}</p>
              <p>{prod.price}$</p>
              <NavLink className='btn btn-secondary' to={`/detail/${prod.id}`}>View detail</NavLink>

              <button className='mx-2 btn btn-success' onClick={()=>{
                  Navigate(`/detail/${prod.id}`);
              }}>Buy Now</button>
          </div>
      </div>
  </div>
    })
  }
  return <>
    <Slide/>
    <div className="container">
    <div className="row">
      {renderProduct()}
    </div>
    </div>
  </>;
}
