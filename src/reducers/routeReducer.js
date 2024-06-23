const initialState = {
  items: [],
  error: null,
};

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ROUTE":
      return {
        ...state,
        items: action.payload,
      };
    case "UPDATE_ROUTE":
      return {
        ...state,
        items: state.items.map((order) =>
          order.id === action.payload.id
            ? { ...order, order_status: action.payload.order_status }
            : order
        ),
      };
    default:
      return state;
  }
};

export default routeReducer;
