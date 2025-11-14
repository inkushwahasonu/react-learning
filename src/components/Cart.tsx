import React, { useReducer } from 'react';

interface IActionType {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR_CART';
  index?: number;
}

interface ICart {
  _id: string;
  amount: number;
  quantity: number;
}

function handleCart(state: ICart[], action: IActionType): ICart[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem: ICart = {
        _id: `${state.length + 1}`,
        amount: 100,
        quantity: 1,
      };
      return [...state, newItem];
    }
    case 'REMOVE_ITEM': {
      if (typeof action.index === 'number') {
        return state.filter((_, i) => i !== action.index);
      }
      return state;
    }
    case 'CLEAR_CART': {
      return [];
    }
    default:
      return state;
  }
}

const Cart: React.FC = () => {
  const [cart, dispatch] = useReducer(handleCart, []);

  return (
    <>
      <div>
        {cart.map((item, index) => (
          <div key={item._id}>
            <span>{`Item: ${item._id}, Amount: $${item.amount}, Quantity: ${item.quantity}`}</span>
            <button onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}>Remove</button>
          </div>
        ))}
      </div>

      <button onClick={() => dispatch({ type: 'ADD_ITEM' })}>Add item</button>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
    </>
  );
}

export default Cart;
