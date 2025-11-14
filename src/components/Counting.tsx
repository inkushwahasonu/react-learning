import React, { useReducer } from "react";

function reducer(state: number, action: { type: string }) {
  console.log("state", state);
  console.log("action", action);

  switch (action.type) {
    case "INCREMENT": {
      return state + 1;
    }
    case "DECREMENT": {
      return state - 1;
    }
    default: {
      return state;
    }
  }
}

const Counting: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, 0);
  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          dispatch({ type: "DECREMENT" });
        }}
      >
        Decrement
      </button>
      <button>Count value is {state}</button>
    </>
  );
};

export default Counting;
