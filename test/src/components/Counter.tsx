import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const increase = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };
  const decrease = () => {
    setCounter(counter > 0 ? counter - 1 : 0);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <button onClick={increase}>+</button>
        <h1>{counter}</h1>
        <button onClick={decrease}>-</button>
      </div>
    </>
  );
};

export default Counter;
