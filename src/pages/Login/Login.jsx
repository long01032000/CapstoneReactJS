import React, { useRef, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import LoginFacebook from '../../components/LoginFacebook/LoginFacebook';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginApi } from '../../redux/reducers/userReducer';

export default function Login(props) {
  const dispatch = useDispatch()

    const renderLogin = () => {
        const onFinish = (values) => {
          console.log('Received values of form: ', values);
          dispatch(loginApi(values))
        };
      
        return (
          <Form
            style={{marginTop: '50px'}}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
      
              <NavLink className="login-form-forgot" to="#">
                Forgot password
              </NavLink>
            </Form.Item>
      
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <NavLink to="/register">register now!</NavLink>
            </Form.Item>
          </Form>
        );
      };

      
  return (
    <div className='container mb-4'>
        <div className="title">
        <h1>Login</h1>
        </div>
     {renderLogin()}
     <LoginFacebook/>
    </div>
  );
}
