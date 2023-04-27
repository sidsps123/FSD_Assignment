import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from "axios";
import "./Signup.css";
import {Link} from "react-router-dom";
const Signup = () => {

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    axios.post('http://localhost:8000/signup',values).then(
        (res)=>{
         message.success('User Successfully Registered!')
        },
        (err)=>{
            message.error('User Already Exists!')
        }
    );   
    onReset();
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item>
      <span className="ant-form-text">Account Signup</span>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Kindly enter a Username!',
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
            message: 'kindly input your Password!',
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Submit
        </Button>
        Already Registered ?  <Link to="/">Login</Link>
      </Form.Item>
    </Form>
  );
};
export default Signup;