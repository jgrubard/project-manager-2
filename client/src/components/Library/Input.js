import React from 'react';

const Input = ({ type, placeholder, name, value, onChange, rows }) => {
  if(type === 'textarea') {
    return (
      <textarea
        className='input-field input-textarea'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows ? rows : 1}
      />
    );
  }
  return (
    <input
      className={`input-field${type === 'textarea' ? ' input-textarea' : ''}`}
      type={type ? type : 'text'}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows ? rows : 1}
    />
  );
}

export default Input;