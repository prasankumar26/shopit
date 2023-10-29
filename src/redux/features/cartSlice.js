import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
}

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
     const item = action.payload;
     const isItemExists = state.cartItems.find((cartItem)=> cartItem?.product === item?.product);
     if(isItemExists){
       state.cartItems = state.cartItems.map((cartItem)=> cartItem.product === item.product ? item : cartItem);
     } else {
        state.cartItems = [...state.cartItems, item];
     }
     localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeCartItems: (state, action) =>{
        state.cartItems = state.cartItems.filter((cartItem) => cartItem.product !== action.payload);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    saveShippingInfo: (state, action) =>{
        state.shippingInfo = action.payload;
        localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo))
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCartItems, removeCartItems, saveShippingInfo } = cartSlice.actions

export default cartSlice.reducer