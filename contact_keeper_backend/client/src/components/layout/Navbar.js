import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const NavBar = ({title , icon}) =>{
const authContext = useContext(AuthContext)
const contactContext = useContext(ContactContext)

const {isAuthenticated , logout , user} = authContext
const {clearContacts} = contactContext;

const onLogout = () =>{
    logout()
    clearContacts();
}

const authLinks =(
    <Fragment> 
        <li className="nav-item disabled p-2 text-right"> Hello {user && user.name}</li>
        <li className="nav-item disabled p-2"> 
            <i class="fa fa-sign-out" onClick={onLogout}></i>Logout
        </li>
    </Fragment>
)

const guestLinks= (
    <Fragment>
    <li className="nav-item  disabled p-2"> <NavLink className="text-muted" to='/about' activeStyle={{color:"white"}}>About</NavLink> </li>      
    <li className="nav-item disabled p-2"><NavLink className="text-muted" to='/register'>Register</NavLink></li>
    <li className="nav-item disabled p-2"><NavLink className="text-muted" to='/login'>Login</NavLink></li>
    </Fragment>
)

return(

    <ul className="nav bg-danger text-light">
         <li className="nav-item p-2"><i class={icon}/>{title} </li> 
        {isAuthenticated ? authLinks : guestLinks}
        </ul>
)}

NavBar.propTypes = {
    title : PropTypes.string.isRequired,
    icon  : PropTypes.string
}

NavBar.defaultProps = {
    title : 'Contact Keeper', 
    icon : 'fa fa-id-card'
}

export default NavBar