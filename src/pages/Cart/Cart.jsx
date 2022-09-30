import { Button, Table } from "antd";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseNumberAction,
  decreaseNumberCartAction,
  deleteItemCartAction,
  getProductCartApi,
  increaseNumberAction,
  increaseNumberCartAction,
} from "../../redux/reducers/productReducer";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    width: 120,
  },
  {
    title: "Img",
    dataIndex: "img",
    width: 150,
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 250,
  },
  {
    title: "Price",
    dataIndex: "price",
    width: 200,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    width: 200,
  },
  {
    title: "Total",
    dataIndex: "total",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export default function Cart() {
  const { arrCart } = useSelector((state) => state.productReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  console.log(arrCart);

  const CartRender = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
      setLoading(true); // ajax request after empty completing

      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div
          style={{
            marginBottom: 16,
          }}
        >
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={cartItem()}
        ></Table>
      </div>
    );
  };
  const cartItem = () => {
    return arrCart.map((item, id) => {
      return {
        id: id + 1,
        img: <img className="w-100" src={item.image} alt="..." />,
        name: `${item.name}`,
        price: `${item.price}`,
        quantity: (
          <>
            <button
              className="btn btn-primary text-white"
              onClick={() => {
                dispatch(increaseNumberCartAction(item));
              }}
            >
              +
            </button>
            {item.quantity}
            <button
              className="btn btn-primary text-white"
              onClick={() => {
                dispatch(decreaseNumberCartAction(item));
              }}
            >
              -
            </button>
          </>
        ),
        total: `${item.price * item.quantity}`,
        action: (
          <>
            <button className="btn me-2 btn-primary text-white">Edit</button>
            <button
              className="btn btn-danger text-white"
              onClick={() => {
                dispatch(deleteItemCartAction(item));
              }}
            >
              Delete
            </button>
          </>
        ),
      };
    });
  };
  return (
    <div className="container">
      <div className="title">
        <h1 className="text-start">Carts</h1>
      </div>
      <div>{CartRender()}</div>
      <div>
        <button
          onClick={() => {
            let arr = [];
           
            for (let i = 0; i < arrCart.length; i++) {
              arr[i] = {
                productId: arrCart[i].id,
                quantity: arrCart[i].quantity,
              };
            }
            let orderCart = {
              orderDetail: arr,
              email: userLogin.email,
            };

            dispatch(getProductCartApi(orderCart));
          }}
          className="btn btn-warning text-white"
        >
          Submit order
        </button>
      </div>
    </div>
  );
}
