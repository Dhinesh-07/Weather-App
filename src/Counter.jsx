import React, { useState } from 'react';
import "./App.css";
import WardOrderChart from './Components/piechart';


function Counter() {
  const [count, setCount] = useState(0);

  //add couner to the home page with + and - buttons and count the clicks
    return (
<>
        <div>
        <h1 >Counter</h1>
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
        <div>
          <WardOrderChart count={count} />
        </div>
        </>

    );
}

export default Counter;