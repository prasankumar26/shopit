import React, { useEffect, useState } from 'react'
import { useForgotPasswordMutation } from '../../redux/api/userApi'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState(" ")

    const [forgotPassword, {isLoading, error, isSuccess}] = useForgotPasswordMutation();
    const {isAuthenticated} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isAuthenticated){
          navigate('/')
        }
  
        if(error){
            toast.error(error?.data?.message)
        }

        if(isSuccess){
            toast.success("Email Sent. Please Check Your Inbox")
        }
        }, [error, isAuthenticated, isSuccess]);
  

    const handleSubmit = (e) =>{
       e.preventDefault();
       forgotPassword({email});
       setEmail("");
    }
    
  return (
    <>
    <div className="row wrapper">
    <div className="col-10 col-lg-5">
        <form
        className="shadow rounded bg-body"
        onSubmit={handleSubmit}
        >
        <h2 className="mb-4">Forgot Password</h2>
        <div className="mt-3">
            <label htmlFor="email_field" className="form-label">
            Enter Email
            </label>
            <input
            type="email"
            id="email_field"
            className="form-control"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
        </div>
        <button
        disabled={isLoading}
            id="forgot_password_button"
            type="submit"
            className="btn w-100 py-2"
        >
          {isLoading ? "Sending..." : "Send Email"}  
        </button>
        </form>
    </div>
    </div>
    </>
  )
}

export default Forgotpassword