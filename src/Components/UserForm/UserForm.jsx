import React, { useEffect, useRef, useState } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormInput from "../utils/FormInput";
import SelectComponent from "../utils/Select";
import Button from "react-bootstrap/Button";
import { hastagOptions } from "../../utils/SelectOptions/hashTags";
import { useNavigate } from "react-router-dom";
import { validations } from "./userFormValidation";

const formInputs = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  tags: [],
  remember: ''
}

const UserForm = () => {

  const [formData, setFormData] = useState(formInputs);
  const [error, setErrors] = useState(null);
  const userRef = useRef(null)
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    if(field === 'tags'){
      const tags = [];
      value?.map(val => {
        return tags.push(val.value);
      })
      setFormData({
        ...formData, [field]: tags
      })
    } else {
      setFormData({
        ...formData, [field]: value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!error){
      const userArr = JSON.parse(localStorage.getItem("userDetails")) || [];
      userArr.push(formData)
      console.log("userArr", userArr)
      localStorage.setItem("userDetails", JSON.stringify(userArr))
      alert('User Created')
      navigate('/dashboard');
    }
  }

  useEffect(() => {
    const formErrors = validations(formData);
    const hasValues = Object.values(formData).find((data) => data.length > 0)
    if(Object.keys(formErrors).length && hasValues){
      setErrors(formErrors)
    } else {
      setErrors(null)
    }
  }, [formData])

  useEffect(() => {
    userRef.current.focus();
  }, [])

  return (
    <>
      <h1 className="fw-bold text-center py-5">User Form</h1>
      <Form className="shadow w-75 mx-auto p-5" onSubmit={handleSubmit}>
        <Row className="mb-5">
          <Form.Group as={Col} controlId="formGridUsername">
            <FormInput label='Username' required={true} error={error?.username} type="text" placeholder="Username..." handleChange={(e) => handleChange('username', e.target.value)} userRef={userRef} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <FormInput label='Email' required={true} error={error?.email} type="email" placeholder="Email..." handleChange={(e) => handleChange('email', e.target.value)} />
          </Form.Group>
        </Row>
        <Row className="mb-5">
          <Form.Group as={Col} controlId="formGridPassword">
            <FormInput label='Password' required={true} error={error?.password} type="password" placeholder="Password..." handleChange={(e) => handleChange('password', e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridConfirmPassword">
            <FormInput label='Confirm Password' required={true} error={error?.confirmPassword} type="password" placeholder="Confirm Password..." handleChange={(e) => handleChange('confirmPassword', e.target.value)} />
          </Form.Group>
        </Row>
        <Row className="mb-5">
          <Form.Group as={Col} controlId="formGridTags">
            <SelectComponent name='tags' options={hastagOptions} isMulti='true' handleChange={(e) => handleChange('tags', e)} />
          </Form.Group>
          <Form.Group as={Col} id="formGridRemember" >
            <Form.Check type="checkbox" label="Remember Me" error={error?.remember} onChange={(e) => handleChange('remember', e.target.value)} />
          </Form.Group>
        </Row>
        <Button variant="info" className="text-light fw-medium px-4" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default UserForm