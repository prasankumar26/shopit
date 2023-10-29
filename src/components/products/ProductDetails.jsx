import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../../redux/api/productsApi';
import Loader from '../Loader';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
import { setCartItems } from '../../redux/features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = () => {

    const [activeImg, setActiveImg] = useState('')
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    const {id} = useParams();

    const {data, isLoading, error, isError} = useGetProductDetailsQuery(id)
    const product = data?.product;

    useEffect(() =>{
        setActiveImg(product?.images[0] ? product?.images[0].url : '/images/default_product.png')
    }, [product])
    
    useEffect(() => {
        if(isError){
            toast.error(error?.data?.message)
        }
      }, [isError]);

      const increaseQuantity = () =>{
        const count = document.querySelector(".count")
        if(count.valueAsNumber >= product?.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
      }

      const decreaseQuantity = () =>{ 
        const count = document.querySelector(".count");
        if(count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
      }

      const setItemToCart = () =>{
        const cartItem = {
          product: product?._id,
          name: product?.name,
          price: product?.price,
          image: product?.images[0].url,
          stock: product?.stock,
          quantity
        }
        dispatch(setCartItems(cartItem)) 
        toast.success("Item Added To Cart")
      }

  if(isLoading) return <Loader />
      
  return (
    <>
    <div className="row d-flex justify-content-around">
  <div className="col-12 col-lg-5 img-fluid" id="product_image">
    <div className="p-3">
      <img
        className="d-block w-100"
        src={activeImg}
        alt=""
        width={340}
        height={390}
      />
    </div>
    <div className="row justify-content-start mt-5">
        {
            product?.images?.map((item, index) =>{
                return (
                <div className="col-2 ms-4 mt-2" key={index}>
                <a role="button">
                <img
                    className={`d-block border rounded p-3 cursor-pointer ${item?.url === activeImg ? 'border-warning' : ''}`}
                    height={100}
                    width={100}
                    src={item?.url}
                    alt={item?.url}
                    onError={(e) => {
                        e.target.src = '/images/default_product.png'; 
                    }}
                    onClick={()=> setActiveImg(item?.url)}
                />
                    </a>
                </div>
                )
            })
        }
    </div>
  </div>
  <div className="col-12 col-lg-5 mt-5">
    <h3>{product?.name}</h3>
    <p id="product_id">Product #{product?._id} </p>
    <hr />
    <div className="d-flex">
      <div className="star-ratings">
           <StarRatings
            rating={product?.ratings}
            starRatedColor="#ffb829"
            numberOfStars={5}
            starDimension='24px'
            starSpacing='1px'
            name='rating'
            />
      </div>
      <span id="no-of-reviews" className="pt-1 ps-2">
        {" "}
        ({product?.numOfReviews} Reviews){" "}
      </span>
    </div>
    <hr />
    <p id="product_price">$ {product?.price}</p>
    <div className="stockCounter d-inline" >
      <span className="btn btn-danger minus" onClick={decreaseQuantity}>-</span>
      <input
        type="number"
        className="form-control count d-inline"
        readOnly
        value={quantity}
      />
      <span className="btn btn-primary plus" onClick={increaseQuantity}>+</span>
    </div>
    <button
      type="button"
      id="cart_btn"
      className="btn btn-primary d-inline ms-4"
      disabled={product.stock <= 0}
      onClick={setItemToCart}
    >
      Add to Cart
    </button>
    <hr />
    <p>
      Status:{" "}
      <span id="stock_status" className={product?.stock > 0  ? 'greenColor' : "redColor"}>
       { product?.stock > 0  ? 'In Stock' : "Out Of Stock"}
      </span>
    </p>
    <hr />
    <h4 className="mt-2">Description:</h4>
    <p>
     {product?.description}
    </p>
    <hr />
    <p id="product_seller mb-3">
      Sold by: <strong>{product?.seller}</strong>
    </p>
    <div className="alert alert-danger my-5" type="alert">
      Login to post your review.
    </div>
  </div>
</div>

    </>
  )
}

export default ProductDetails