import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Resetpassword = () => {

    const initialState = {
        password: '',
        confirmPassword: '',
    }

    const [values, setValues] = useState(initialState);

    const navigate = useNavigate()
    const params = useParams()

    const [resetPassword, {error, isLoading, isSuccess}] = useResetPasswordMutation()

    const {isAuthenticated} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isAuthenticated){
          navigate('/')
        }
  
        if(error){
            toast.error(error?.data?.message)
        }

        if(isSuccess){
            toast.success("Password Updated")
            navigate('/login')
        }
        }, [error, isAuthenticated, isSuccess]);
  

    const handleChange = (e) =>{
       const {name, value} = e.target;
       setValues({...values, [name]:value});
    }

    const handleSubmit = (e) =>{

        const {password, confirmPassword } = values;

         if(password !== confirmPassword){
           return toast.error("password & confirm Password Not Matched")
         }

        e.preventDefault();
        resetPassword({token:params?.token, body:values})
        setValues(initialState)
        console.log(values, "values");
    }

  return (
    <>
      <div className="row wrapper">
     <div className="col-10 col-lg-5">
    <form
      className="shadow rounded bg-body"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4">New Password</h2>
      <div className="mb-3">
        <label htmlFor="password_field" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password_field"
          className="form-control"
          name="password"
          onChange={handleChange}
          value={values.password}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirm_password_field" className="form-label">
          Confirm Password
        </label>
        <input

          type="password"
          id="confirm_password_field"
          className="form-control"
          name="confirmPassword"
          onChange={handleChange}
          value={values.confirmPassword}
        />
      </div>
      <button id="new_password_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
       {isLoading ? 'Loading...' : 'Set Password' } 
      </button>
    </form>
    </div>
  </div>
    </>
  )
}

export default Resetpassword