import React from 'react';

const Button = ({ onClick, label, active, long, disabled, type, style }) => {
  style = style ? style : {};
  return (
    <button
      className={`
        button
        ${ active ? '' : ' button-inactive'}
        ${ long ? ' button-long' : ''}
        ${ type === 'danger' ? ' button-danger' : ''}
        ${ type === 'info' ? ' button-info' : ''}
      `}
      onClick={onClick}
      disabled={disabled ? disabled : false}
      style={style}
    >
      {label}
    </button>
  );
}

export default Button;