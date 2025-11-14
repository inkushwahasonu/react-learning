import React, { useReducer } from "react";

interface IActionType {
  type:
    | "ADD_ITEM"
    | "REMOVE_ITEM"
    | "CLEAR_CART"
    | "INCREMENT_QUANTITY"
    | "DECREMENT_QUANTITY";
  index?: number;
  id?: string;
}

interface ICart {
  _id: string;
  amount: number;
  quantity: number;
}

const handleCart = (state: ICart[], action: IActionType): ICart[] => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItem: ICart = {
        _id: `${state.length + 1}`,
        amount: 100,
        quantity: 1,
      };
      return [...state, newItem];
    }
    case "REMOVE_ITEM": {
      if (typeof action.index === "number") {
        return state.filter((_, i) => i !== action.index);
      }
      return state;
    }
    case "CLEAR_CART": {
      return [];
    }
    case "INCREMENT_QUANTITY": {
      return state.map((item) => {
        const updatedItems =
          item._id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        return updatedItems;
      });
    }
    case "DECREMENT_QUANTITY": {
      return state
        .map((item) => {
          const updatedItems =
            item._id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item;
          return updatedItems;
        })
        .filter((item) => {
          return item.quantity >= 1;
        });
    }
    default:
      return state;
  }
};

const Cart: React.FC = () => {
  const [cart, dispatch] = useReducer(handleCart, []);

  return (
    <>
      <div>
        {cart.map((item, itemIndex) => (
          <div key={item._id}>
            <span>{`Item: ${item._id}, Amount: $${item.amount}, Quantity: ${item.quantity}`}</span>
            <button
              onClick={() =>
                dispatch({ type: "INCREMENT_QUANTITY", id: item._id })
              }
            >
              +
            </button>
            <button
              onClick={() =>
                dispatch({ type: "DECREMENT_QUANTITY", id: item._id })
              }
            >
              -
            </button>
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", index: itemIndex })
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => dispatch({ type: "ADD_ITEM" })}>Add item</button>
      <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
        Clear Cart
      </button>
    </>
  );
};

export default Cart;
