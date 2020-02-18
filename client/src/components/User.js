import React, { useState } from 'react';

function User(props) {
  const { name, bio } = props.info;
  return (
    <div>
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
}
export default User;
