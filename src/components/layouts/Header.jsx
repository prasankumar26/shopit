import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGetMeQuery } from '../../redux/api/userApi'
import { useSelector } from 'react-redux';
import { useLazyLogoutQuery } from '../../redux/api/authApi';
import toast from 'react-hot-toast';

const Header = () => {
    const navigate = useNavigate()
    const { isLoading} = useGetMeQuery();
    const [logout, {data}] = useLazyLogoutQuery();

    if(data?.message){
        toast.error(data?.message)
        navigate(0)
    }
    
    const {user} = useSelector((state)=> state.auth)

    const logoutUser = () =>{
        logout();
    }

  return ( 
    <>
    <nav className="navbar row">
    <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
        <a href="/">
            <img src="/images/shopit_logo.png" alt="ShopIT Logo" />
        </a>
        </div>
    </div>
    <div className="col-12 col-md-6 mt-2 mt-md-0">
        <form action="your_search_action_url_here" method="get">
        <div className="input-group">
            <input
            type="text"
            id="search_field"
            aria-describedby="search_btn"
            className="form-control"
            placeholder="Enter Product Name ..."
            name="keyword"
            defaultValue=""
            />
            <button id="search_btn" className="btn" type="submit">
            <i className="fa fa-search" aria-hidden="true" />
            </button>
        </div>
        </form>
    </div>
    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{ textDecoration: "none" }}>
        <span id="cart" className="ms-3">
            {" "}
            Cart{" "}
        </span>
        <span className="ms-1" id="cart_count">
            0
        </span>
        </a>

           
         {
            user ? (
                <div className="ms-4 dropdown">
        <button
            className="btn dropdown-toggle text-white"
            type="button"
            id="dropDownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <figure className="avatar avatar-nav">
            <img
                src={user?.avatar ? user?.avatar?.url : '../images/default_avatar.jpg'}
                alt="User Avatar"
                className="rounded-circle"
            />
            </figure>
            <span>{user?.name}</span>
        </button>
        <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
            <Link className="dropdown-item" to="/admin/dashboard">
            {" "}
            Dashboard{" "}
            </Link>
            <Link className="dropdown-item" to="/me/orders">
            {" "}
            Orders{" "}
            </Link>
            <Link className="dropdown-item" to="/me/profile">
            {" "}
            Profile{" "}
            </Link>
            <div className="dropdown-item text-danger"  onClick={logoutUser}>
            {" "}
            Logout{" "}
            </div>
        </div>
        </div>
            ) :  (
            !isLoading && (
            <Link to="/login" className="btn ms-4" id="login_btn">
            Login
            </Link>
                )
            )
         }
    </div>
    </nav>
    </>
  )
}

export default Header