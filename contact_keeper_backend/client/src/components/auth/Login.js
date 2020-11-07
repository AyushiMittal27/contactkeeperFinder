import React , {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

const Login = (props) =>{

const authContext = useContext(AuthContext);
const alertContext = useContext(AlertContext);


const {setAlert} = alertContext;
const {login,  error , clearError , isAuthenticated} = authContext;

useEffect(()=>{
    if(isAuthenticated){
        props.history.push('/')
    }

    if(error === 'Invalid Credentials'){
        setAlert(error , 'danger');
        clearError();
    }
    // eslint-disable-next-line
}, [error , isAuthenticated , props.history])

    
const [user , setUser] = useState({
    email : '',
    password : '',
})    

const {email , password } = user;

const onChange = e => setUser({...user , [e.target.name] : e.target.value})

const onSubmit = e =>{
    e.preventDefault();
    if(email === '' || password === ''){
        setAlert('please fill in all fields ' , 'danger')
    }
    else{
        login({email , password})
    }
     
}

return(
  < div className="container">
      <h1>
          Account < span className="text-primary"> Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        
          <div className="form-group">
              <label htmlFor='email' className="text-muted">Email Address</label>
              <input type="email" className="form-control" name='email' value={email} onChange ={onChange} />
          </div>
          <div className="form-group">
              <label htmlFor='password' className="text-muted">Password</label>
              <input type="password" className="form-control" name='password' value={password} onChange ={onChange} />
          </div>
          <input type="submit" value="Login" className="btn btn-primary" />                         
      </form>
  </div>
)

}

export default Login