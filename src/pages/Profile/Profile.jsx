import React, { useEffect, useState } from "react";
import { Avatar, Button, Form, Input, Modal, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileApi,
  updateProfileApi,
} from "../../redux/reducers/userReducer";

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
    width: 350,
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
];
const data = [];

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Profile() {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.userReducer);
  console.log(userLogin);

  useEffect(() => {
    getProfileApi();
  }, []);

  // data.push({
  //   id: 1,
  //   img: 2,
  //   name: `Edward King `,
  //   price: 300,
  //   quantity: `London, Park Lane no`,
  //   total: 2,
  // });

  const TableRender = () => {
    const arr = () => {
      return userLogin.ordersHistory.map((od, index) => {
        return od.orderDetail.map((prod, id) => {
          return data.push({
            id: id + 1,
            img: <img className="w-100" src={prod.image} alt="..." />,
            name: `${prod.name}`,
            price: `${prod.price}`,
            quantity: `${prod.quantity}`,
            total: `${prod.price * prod.quantity}`,
          });
        });
      });
    };
    arr();

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 50,
        }}
      />
    );
  };

  const ProfileRender = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
      console.log("Received values of form: ", values);
      dispatch(updateProfileApi(values));
    };

    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="84">+84</Option>
        </Select>
      </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    return (
      <Form
        {...formItemLayout}
        form={form}
        name="update"
        onFinish={onFinish}
        initialValues={userLogin}
        scrollToFirstError
      >
        <div className="row">
          <div className="col-3">
            <Avatar size={160} src="https://joeschmoe.io/api/v1/random" />
          </div>
          <div className="col-4">
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input disabled={true} value={userLogin.email} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                addonBefore="+84"
                style={{
                  width: "100%",
                }}
                value={userLogin.phone}
              />
            </Form.Item>
          </div>
          <div className="col-4">
            <Form.Item
              name="name"
              label="name"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true,
                },
              ]}
            >
              <Input value={userLogin.name} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password value={userLogin.password} />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "Please select gender!",
                },
              ]}
            >
              <Select placeholder="select your gender" value={userLogin.gender}>
                <Option value={true}>Male</Option>
                <Option value={false}>Female</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="profile-title">
        <h1>Profile</h1>
      </div>
      {ProfileRender()}

      <div className="container">
        <div className="row justify-content-start order-favorite">
          <div className="col-2 order">
            <div className="text-order">Order History</div>
          </div>
          <div className="col-2 favorite">
            <div className="text-favorite">Favorite</div>
          </div>
        </div>
        {TableRender()}
      </div>
    </div>
  );
}
