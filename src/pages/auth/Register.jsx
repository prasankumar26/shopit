import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../../redux/api/authApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()

    const [register, {data, error, isError, isLoading}] = useRegisterMutation()

    const initialState = {
        name: '',
        email: '',
        password: '',
    }

    console.log(data, "data");

    if(data?.token){
        toast.success("Register Successfull")
        navigate('/login')
    }

    const [values, setValues] = useState(initialState)

    useEffect(() => {
        if(isError){
            toast.error(error?.data?.message)
        }
      }, [isError]);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setValues({...values, [name]:value})
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      register(values)
      setValues(initialState)
    }

  return (
    <>
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
        className="shadow rounded bg-body"
        onSubmit={handleSubmit}
        >
        <h2 className="mb-4">Register</h2>
        <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
            Name
            </label>
            <input
            type="text"
            id="name_field"
            className="form-control"
            name="name"
            value={values.name}
            onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
            Email
            </label>
            <input
            type="email"
            id="email_field"
            className="form-control"
            name="email"
            value={values.email}
            onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="password_field" className="form-label">
            Password
            </label>
            <input
            type="password"
            id="password_field"
            className="form-control"
            name="password"
            value={values.password}
            onChange={handleChange}
            />
        </div>
        <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
          {isLoading ? 'LOADING...' : 'REGISTER'}  
        </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Register