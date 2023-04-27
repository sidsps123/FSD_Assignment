import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,message} from 'antd';
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
     axios.post('http://localhost:8000/login',values).then(
      (res)=>{
            navigate('/food');
      },
      (err)=>{
        console.log(err.response);
      if(err.response.status===400){
          //password incorrect
          message.error('Password is incorrect');
      }
      else if(err.response.status===404){
       //user does not exist
        message.error('user does not exist');
      }else{
        message.error('Technical Error:Kindly try after sometime');
      }
        onReset();
      }
  );   
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
      <span className="ant-form-text">Account Login</span>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="./signup">register now!</Link>
      </Form.Item>
    </Form>
  );
};
export default Login;