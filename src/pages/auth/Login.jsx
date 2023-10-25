import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const [login, {data, isError, error, isLoading}] = useLoginMutation()

    const initialtate = {
       email: '',
       password: '',
    }

    const [values, setValues] = useState(initialtate);

    useEffect(() => {
        if(isError){
            toast.error(error?.data?.message)
        }
      }, [isError]);

      if(data?.token){
        toast?.success("Login Successfull")
        navigate('/')
      }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }

    const handleSubmit = (e) =>{
       e.preventDefault();
       login(values);
       setValues(initialtate);
    }
    

  return (
    <>
    <div className="row wrapper">
  <div className="col-10 col-lg-5">
    <form
      className="shadow rounded bg-body"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4">Login</h2>
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
      <Link to="/password/forgot" className="float-end mb-4">
        Forgot Password?
      </Link>
      <button id="login_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
       {isLoading ? 'Authenticating...' : 'LOGIN'}  
      </button>
      <div className="my-3">
        <Link to="/register" className="float-end">
          New User?
        </Link>
      </div>
    </form>
  </div>
</div>

    </>
  )
}

export default Login