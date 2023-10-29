import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { setCartItems, removeCartItems } from '../../redux/features/cartSlice';
import toast from 'react-hot-toast';

const Cart = () => {

  const { cartItems } = useSelector((state)=> state.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const increaseQuantity = (item, quantity) =>{
    const newQty = quantity + 1;
    if(newQty > item?.stock) return;
    setItemToCart(item, newQty)
  }

  const decreaseQuantity = (item, quantity) =>{ 
    const newQty = quantity - 1;
    if(newQty <= 0) return;
    setItemToCart(item, newQty)
  }

  const setItemToCart = (item, newQty) =>{
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    }
    dispatch(setCartItems(cartItem)) 
    toast.success("Cart Updated")
  }

  const removeItemFromcart = (id) =>{
    dispatch(removeCartItems(id));
    toast.error('Item Removed From Cart')
  }

  const checkoutHandler = () =>{
    navigate('/shipping')
  }

  if(cartItems.length === 0){
    return <div className='text-center'>
      <h2 className='mt-4'>Your Cart Is Empty</h2>
      <Link to="/" className='btn btn-success'>Add Products</Link>
    </div>
  }

  return (
     <>
  <h2 className="mt-5">
    Your Cart: <b> {cartItems?.length} items</b>
  </h2>
  <div className="row d-flex justify-content-between">
    <div className="col-12 col-lg-8">
      {/* Cart Items */}
      <hr />
      {cartItems.map((cartItem) =>{
        return (
            <Fragment key={cartItem?.product}>
              <div className="cart-item" data-key="product1" >
        <div className="row">
          <div className="col-4 col-lg-3">
            <img
              src={cartItem?.image}
              alt={cartItem?.name}
              height={90}
              width={115}
              onError={(e) => {
                e.target.src = '/images/default_product.png'; 
            }}
            />
          </div>
          <div className="col-5 col-lg-3">
            <Link to={`/products/${cartItem?.product}`}> {cartItem?.name} </Link>
          </div>
          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
            <p id="card_item_price">${cartItem?.price}</p>
          </div>
          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={()=> decreaseQuantity(cartItem, cartItem.quantity)}> - </span>
              <input
                type="number"
                className="form-control count d-inline"
                readOnly=""
                value={cartItem?.quantity}
              />
              <span className="btn btn-primary plus" onClick={()=> increaseQuantity(cartItem, cartItem.quantity)}> + </span>
            </div>
          </div>
          <div className="col-4 col-lg-1 mt-4 mt-lg-0" onClick={()=> removeItemFromcart(cartItem?.product)}>
            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" />
          </div>
        </div>
      </div>
      <hr />
            </Fragment>
        )
      })}
    
      {/* Add more cart items here as needed */}
    </div>
    <div className="col-12 col-lg-3 my-4">
      <div id="order_summary">
        <h4>Order Summary</h4>
        <hr />
        <p>
          Units: <span className="order-summary-values">
            {cartItems.reduce((acc, curr) => acc + curr?.quantity, 0)}
             (Units)</span>
        </p>
        <p>
          Est. total: <span className="order-summary-values">$
          {cartItems.reduce((acc, curr) => acc + curr?.quantity * curr?.price, 0).toFixed(2)}
          </span>
        </p>
        <hr />
        <button id="checkout_btn" className="btn btn-primary w-100" onClick={()=> checkoutHandler()}>
          Check out
        </button>
      </div>
    </div>
  </div>
</>
  )
}

export default Cart