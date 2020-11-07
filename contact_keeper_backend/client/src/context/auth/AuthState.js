import React , {useReducer} from 'react'
import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGN_FAIL, LOGOUT } from '../types'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import setToken from '../../utils/setAuthToken'
import setAuthToken from '../../utils/setAuthToken'


const AuthState = (props)=>{

const initialState ={
        token : localStorage.getItem('token'),
        isAuthenticated : null,
        loading: true,
        user : null,
        error : null 
}

const [state , dispatch]= useReducer(AuthReducer , initialState)

//load user
const loadUser = async() =>{
   if(localStorage.token){
       setAuthToken(localStorage.token)
   }
    try{
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload : res.data
      })
   }catch(err){
      dispatch({type: AUTH_ERROR})
   }
}

//register user
const register = async formData =>{
    const config={
        headers: {
            'Content-Type' : 'application/json',
        }
    }
    try{
        const res= await axios.post('/api/users', formData , config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload : res.data
        })
        loadUser();
    }catch(err){
       // console.log(err.response.data.msg);
        dispatch({
            type: REGISTER_FAIL,
            payload : err.response.data.msg
        })
      
    }
}

//login user
const login = async formData =>{
    const config = {
        headers: {
            'Content_Type': 'application/json'
        }
    }
    try{
       const res= await axios.post('/api/auth' , formData , config)

       dispatch({type : LOGIN_SUCCESS, payload: res.data})
       loadUser()
    }catch(err){
       dispatch({type: LOGN_FAIL , payload: err.response.data.msg})    
    }
}

//logout user
const logout = ()=> dispatch({type:LOGOUT})
//clear error
const clearError = ()=> dispatch({type : CLEAR_ERRORS})

return (
    <AuthContext.Provider value={{
          token : state.token,
          isAuthenticated : state.isAuthenticated,
          loading : state.loading,
          user : state.user,
          error : state.error,
          register,
          loadUser,
          login,
          logout,
          clearError
    }}>
     {props.children}
    </AuthContext.Provider>
)


}

export default AuthState