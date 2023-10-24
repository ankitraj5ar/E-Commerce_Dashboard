import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/');
    }
    return(
        <div>
            <img src="https://www.ankitraj5ar.tech/img/white.png" alt="logo" className="logo" />
            {
                 auth? <ul className="nav-bar">
                 <li><Link to='/'>Products</Link></li>
                 <li><Link to='/add'>Add Product</Link></li>
                 <li><Link to='/update'>Update Product</Link></li>
                 <li><Link to='/delete'>Delete Product</Link></li>
                 <li><Link to='/profile'>Profile</Link></li>
                 <li><Link onClick={logout} to='/login'>Logout ({JSON.parse(auth).name})</Link></li>
                 </ul>
                 :
                <ul className="nav-bar nav-right">
                <li><Link to='/signup'>SignUp</Link></li>
                <li><Link to='/login'>Login</Link></li>
                </ul>
            }
           
        </div>
    )
}
export default Nav;