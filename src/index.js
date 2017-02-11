import React from 'react';
import { render } from 'react-dom';

var div = document.createElement('app');

var Hello = () => (
    <div>
        Hello, This is react!!
    </div>
);

render(<Hello />, div);

document.body.appendChild(div);