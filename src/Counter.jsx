import React, { useState } from 'react';
import "./App.css";

function Counter() {
  const [count, setCount] = useState(0);

  //add couner to the home page with + and - buttons and count the clicks
    return (

        <div>
        <h1 className="home">Counter</h1>
        <div className="container">
        <p>Count: {count}</p>
        <br />
        <button onClick={() => setCount(count + 1)}>+</button>
        <br />
        <br />
        <button onClick={() => setCount(count - 1)}>-</button>
        <br />
        <br />
        <button onClick={() => setCount(0)}>Reset</button>
        </div>
        </div>

    );
}

export default Counter;