import React, { useState } from 'react';

function User(props) {
  const { name, bio } = props.info;
  return (
    <div className='user-display-box'>
      <div className='info-display'>
        <h2>{name}</h2>
        <p>{bio}</p>
      </div>
      {/* <button type='button' className='remove-btn'>
        X
      </button> */}
    </div>
  );
}
export default User;
