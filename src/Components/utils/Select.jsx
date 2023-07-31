import React from 'react'
import Select from 'react-select'

const SelectComponent = ({name, options, handleChange}) => (
  <Select options={options} 
  isMulti 
  onChange={handleChange}
  name={name}
  className="basic-multi-select"
  classNamePrefix="Tags" />
)

export default SelectComponent