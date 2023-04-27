import React,{useState} from "react";
import {Button,Modal,Form,Input,message} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};
const Header = props => {
  const { search, onInputChange, onSearchClick } = props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const onReset = () => {
    form.resetFields();
  };

  const check=(values)=>{
    axios.post('http://localhost:8000/recipes',values).then(
      (res)=>{
        message.success("Recipe Added Successfully")
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
  axios.post('http://localhost:8000/recipes/steps',values).then(
      (res)=>{
        message.success("Steps Added Successfully")
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
  axios.post('http://localhost:8000/recipes/ingredients',values).then(
      (res)=>{
        message.success("Ingredients Added Successfully")
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
    setOpen(false);
  }

  return (
    <div className="jumbotron">
      <h1 className="display-1">
        <i class="material-icons brand-icon">fastfood</i> Food Recipe
      </h1>
      <div class="input-group w-50 mx-auto">
        <input
          type="text"
          class="form-control"
          placeholder="Search Your Recipe..."
          value={search}
          onChange={onInputChange}
        />
        <div class="input-group-append">
          <button className="btn btn-dark" onClick={onSearchClick}>
            Search Recipe
          </button>
        </div>
      </div>
      <Button type="primary" style={{"marginTop":"20px"}} onClick={() => setOpen(true)}>Add Recipe</Button>
      <Modal
      title="Add Recipe"
      open={open}
      onCancel={()=>setOpen(false)}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            check(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      >
        <Form
                form={form}
                name="form_in_modal"
                labelAlign="left"
                labelWrap={true}
                initialValues={{
                  modifier: "public",
                }}
                style={{ width: "100%", resize: "auto" }}
        >
           <Form.Item
           name="food_name"
           label="food_name"
           rules={[
            {
              required: true,
              message: "Please input the food name!",
            },
          ]}
           >
            <Input placeholder="Food Name"/>
         </Form.Item>
         <Form.Item
           name="description"
           label="description"
           rules={[
            {
              required: true,
              message: "Please input the description!",
            },
          ]}
           >
            <Input placeholder="Description"/>
         </Form.Item>
         <Form.Item
           name="image"
           label="Image Link"
           rules={[
            {
              required: true,
              message: "Please input the link of the food image!",
            },
          ]}
           >
            <Input placeholder="Image Link"/>
         </Form.Item>
        <Form.List
        name="ingredients"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 1) {
                return Promise.reject(new Error('At least 1 ingredient'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Ingredients' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input ingredient or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Ingredients"
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: '60%',
                }}
                icon={<PlusOutlined />}
              >
                Add Ingredients
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.List
        name="steps"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 1) {
                return Promise.reject(new Error('At least 1 step'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'steps' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input a step or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Steps"
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: '60%',
                }}
                icon={<PlusOutlined />}
              >
                Add Steps
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default Header;
