import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGN_FAIL , LOGOUT} from '../types'


export default (state , action) =>{

    switch(action.type){
        case REGISTER_SUCCESS:
            localStorage.setItem('token' , action.payload.token);
            return{
               ...state,
               ...action.payload,
               isAuthenticated: true,
               loading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token );
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }    
        case REGISTER_FAIL:
        case AUTH_ERROR:    
        case LOGN_FAIL:
        case LOGOUT:    
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            } 
        case CLEAR_ERRORS:
            return{
                ...state,
                error : null
            }
        case USER_LOADED:
            return{
             ...state,
             isAuthenticated: true,
             loading: false,
             user: action.payload
            }                 
        default:
            return state;    
    }
}