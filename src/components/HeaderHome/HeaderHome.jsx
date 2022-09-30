import { Tabs } from "antd";
import { attachTypeApi } from "antd/lib/message";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../..";
import { ACCESS_TOKEN, getStore } from "../../util/tool";
import Slide from "../Slide/Slide";

export default function HeaderHome() {
  const { userLogin } = useSelector((state) => state.userReducer);
  const {arrCart} = useSelector((state) => state.productReducer )
  const Logout = () => {
    localStorage.clear("token");
    window.location.reload();
  };

  const errorCart = () => {
    if (!getStore(ACCESS_TOKEN)) {
      alert("Đăng nhập để vào trang này!");
      return history.push("/login");
    }
  };



  return (
    <div className="header">
      <nav className="navbar navbar-expand-sm navbar-dark bg-black">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src="./img/logo.png" alt="..." />
          </NavLink>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          />
          <div
            className="collapse navbar-collapse flex-row-reverse"
            id="collapsibleNavId"
          >
            <ul className="navbar-nav mt-2 mt-lg-0">
              <li className="nav-item">
                {userLogin ? (
                  <NavLink to="/profile"><span
                  style={{ color: "#F7F7F7", margin: "0 10px 0 10px" }}
                  
                >
                  {userLogin.name}
                </span></NavLink>
                ) : (
                  <NavLink to="/login">
                    <span style={{ color: "#F7F7F7", margin: "0 10px 0 10px" }}>
                      Login
                    </span>
                  </NavLink>
                )}
              </li>
              <li className="nav-item">
                
                {userLogin ? (
                  <span onClick={() => Logout()}>
                    <NavLink to="/login">
                      <span style={{ color: "#F7F7F7" }}>Logout</span>
                    </NavLink>
                  </span>
                ) : (
                  <NavLink to="/register">
                    <span style={{ color: "#F7F7F7" }}>Register</span>
                  </NavLink>
                )}
              </li>
            </ul>
            <div className="d-flex cart-logo">
            {userLogin ? (
               <NavLink to="/cart">
               <img className="ms-2" src="./img/cart.png" alt="..." />
              
               </NavLink>
              ) : (
                <><img onClick={() => errorCart()} className="ms-2" src="./img/cart.png" alt="..." /></>
                // <img onClick={() => errorCart()} className="ms-2" src="./img/cart.png" alt="..." /><span className="text-white">()</span>
              )}
               <span className="text-white">({arrCart.length})</span>
            </div>
            <form className="d-flex my-2 my-lg-0">
              <input
                className="form-control me-sm-2"
                type="text"
                placeholder="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Home" key="1"></Tabs.TabPane>
          <Tabs.TabPane tab="Men" key="2"></Tabs.TabPane>
          <Tabs.TabPane tab="Women" key="3"></Tabs.TabPane>
          <Tabs.TabPane tab="Kid" key="4"></Tabs.TabPane>
          <Tabs.TabPane tab="Sport" key="5"></Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

/* <div className="w-50">
                <div style={{marginTop:'110px'}}>
                <div>
                    <h1 className="mb-0">Product Name</h1>
                    <span>Product Description</span>
                </div>
                <button className="btn btn-danger">Buy now</button>
                </div>
            </div> */
