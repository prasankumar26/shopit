import React, { useEffect, useState } from 'react'
import { useUpdatePasswordMutation } from '../../redux/api/userApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UpdatePassword = () => {

    const navigate = useNavigate()

    const [updatePassword, {isLoading, error, isSuccess}] = useUpdatePasswordMutation()

    const initialState = {
        oldPassword: '',
        password: '',
    }

    const [values, setValues] = useState(initialState)

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setValues({...values, [name]:value})
    }

    useEffect(() =>{
       if(error){
        toast.error(error.data.message)
       }

       if(isSuccess){
        toast.success('Password Updated')
        navigate('/me/profile')
       }
    }, [error, isSuccess])

    const handleSubmit = (e) =>{
        e.preventDefault()
        updatePassword(values)
        setValues(initialState)
    }

  return (
    <>
    <div className="row wrapper">
    <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
        <h2 className="mb-4">Update Password</h2>
        <div className="mb-3">
            <label htmlFor="old_password_field" className="form-label">
            Old Password
            </label>
            <input
            type="password"
            name="oldPassword"
            id="old_password_field"
            className="form-control"
            onChange={handleChange}
            value={values.oldPassword}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="new_password_field" className="form-label">
            New Password
            </label>
            <input
            type="password"
            name="password"
            id="new_password_field"
            className="form-control"
            onChange={handleChange}
            value={values.password}
            />
        </div>
        <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
          {isLoading ? 'Password Updating...' : 'Update Password' }  
        </button>
        </form>
    </div>
    </div>
    </>
  )
}

export default UpdatePassword