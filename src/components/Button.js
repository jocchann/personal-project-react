import React from 'react';

const Button = props => <button onClick={props.action} className="button">{props.text}</button>

export default Button;