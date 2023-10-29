import React, { useEffect, useState } from 'react'
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';


const initialState = {
    address: '',
    city: '',
    phoneNo: '',
    postalCode: '',
    country: '',
}

const Shipping = () => {
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate()

    const handleChange = (e) =>{
       const {name, value} = e.target;
       setValues({...values, [name]:value})
    }
     
    const countriesList = Object.values(countries);
    const dispatch = useDispatch()

    const {shippingInfo} = useSelector((state)=> state.cart)

    useEffect(() =>{
        if(shippingInfo){
           setValues({
            ...shippingInfo
           })
        }
    }, [shippingInfo])

    const handleSubmit = (e) =>{
      e.preventDefault();
      dispatch(saveShippingInfo(values));
      navigate('/confirm_order')
      setValues(initialState);
    }

  return (
 <>
    <CheckoutSteps shipping />

  <div className="row wrapper mb-5">
    <div className="col-10 col-lg-5">
    <form
      className="shadow rounded bg-body"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4">Shipping Info</h2>
      <div className="mb-3">
        <label htmlFor="address_field" className="form-label">
          Address
        </label>
        <input
          type="text"
          id="address_field"
          className="form-control"
          name="address"
          value={values.address}
          onChange={handleChange}
          required=""
        />
      </div>
      <div className="mb-3">
        <label htmlFor="city_field" className="form-label">
          City
        </label>
        <input
          type="text"
          id="city_field"
          className="form-control"
          name="city"
          value={values.city}
          onChange={handleChange}
          required=""
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone_field" className="form-label">
          Phone No
        </label>
        <input
          type="tel"
          id="phone_field"
          className="form-control"
          name="phoneNo"
          value={values.phoneNo}
          onChange={handleChange}
          required=""
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postal_code_field" className="form-label">
          Postal Code
        </label>
        <input
          type="number"
          id="postal_code_field"
          className="form-control"
          name="postalCode"
          value={values.postalCode}
          onChange={handleChange}
          required=""
        />
      </div>
      <div className="mb-3">
        <label htmlFor="country_field" className="form-label">
          Country
        </label>
        <select
          id="country_field"
          className="form-select"
          name="country"
          value={values.country}
          onChange={handleChange}
          required=""
        >
            {
                countriesList.map((item, index) =>{
                    return <option key={index} value={item?.name}>{item?.name}</option>
                })
            }
        </select>
      </div>
      <button id="shipping_btn" type="submit" className="btn w-100 py-2">
        CONTINUE
      </button>
    </form>
  </div>
 </div>
</>
  )
}

export default Shipping