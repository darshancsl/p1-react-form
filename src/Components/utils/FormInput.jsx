import React from 'react';
import Form from "react-bootstrap/Form";

const FormInput = ({label, type, placeholder, handleChange, userRef, error, required}) => {
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} required={required} isInvalid={error} placeholder={placeholder} onChange={handleChange} ref={userRef}/>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </>
  )
}

export default FormInput