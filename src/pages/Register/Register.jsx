import React, { useState } from 'react'
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
  } from 'antd';
import { signupApi } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';

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

export default function Register() {
    const dispatch = useDispatch();

    const RegisterRender = () => {
        const [form] = Form.useForm();
      
        const onFinish = (values) => {
          console.log('Received values of form: ', values);
          dispatch(signupApi(values))
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
            name="register"
            onFinish={onFinish}
            initialValues={{
              prefix: '84',
            }}
            scrollToFirstError
          >
           <div className='row'>
           <div className='col-6'>
            <Form.Item
            
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
         
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item
         
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
    
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
            </div>
      
          <div className='col-6'>
          <Form.Item
           
           name="name"
           label="Name"
           tooltip="What do you want others to call you?"
           rules={[
             {
               required: true,
               message: 'Please input your nickname!',
               whitespace: true,
             },
           ]}
         >
           <Input />
         </Form.Item>
   
         <Form.Item
           name="phone"
           label="Phone Number"
           rules={[
             {
               required: true,
               message: 'Please input your phone number!',
             },
           ]}
         >
           <Input
             addonBefore={prefixSelector}
             style={{
               width: '100%',
             }}
           />
         </Form.Item>
   
         <Form.Item
           name="gender"
           label="Gender"
           rules={[
             {
               required: true,
               message: 'Please select gender!',
             },
           ]}
         >
           <Select placeholder="select your gender">
             <Option value="true">Male</Option>
             <Option value="false">Female</Option>
             
           </Select>
         </Form.Item>

         <Form.Item  {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </div>
           </div>
      
            
          </Form>
        );
      };
  return (
    <div className='container mb-4'>
      <div className='title'>
      <h1 className='text-center'>Register</h1>
      </div>
      {RegisterRender()}
    </div>
  )
}
