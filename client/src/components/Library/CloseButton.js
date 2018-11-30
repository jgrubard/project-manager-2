import React from 'react';

const CloseButton = ({ onClick, label, active }) => {
  return (
    <button
      className='button button-square'
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CloseButton;