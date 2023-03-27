import React, { useReducer } from "react";


const reducer = (state, action) => {
      console.log("state,action", state, action);
    switch (action.type) {
        case "increment": {
            // count: state + 1;
            console.log("state", state);
        return  (state + 1);
      }
      case "decrement": {
        return  (state - 1 );
      }
      case "multiply": {
        return  (state * 2 );
      }
      case "divide": {
        return  (state / 2 );
      }
      default: {
        throw new Error();
      }
    }
};

export default function Usereducer() {
  const initialState = 0;
  
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("state", state.count);

  return (
    <div>
      Count:{state}
      {/* <div style={{marginLeft:"10px"}}> */}
              <button onClick={() => dispatch({ type: "increment" })} style={{margin:"10px"}}>+</button>
              {/* <br></br> */}
      <button onClick={() => dispatch({ type: "decrement" })} style={{margin:"10px"}}>-</button>
      <button onClick={() => dispatch({ type: "multiply" })} style={{margin:"10px"}}>*</button>
      <button onClick={() => dispatch({ type: "divide" })} style={{margin:"10px"}}>/</button>
      {/* </div> */}
    </div>
  );
}
