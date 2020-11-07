import React , {useState , useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = (props) =>{

const alertContext = useContext(AlertContext)
const authContext = useContext(AuthContext)

const {setAlert} = alertContext
const {register , error , isAuthenticated} = authContext

useEffect(()=>{
    if(isAuthenticated){
        props.history.push('/')
    }
    if(error==='User already exists'){
        setAlert(error , 'danger')
    }
    //eslint-disable-next-line
}, [error , isAuthenticated, props.history])

const [user , setUser] = useState({
    name : '',
    email : '',
    password : '',
    password2 : ''
})    

const {name , email , password , password2} = user;

const onChange = e => setUser({...user , [e.target.name] : e.target.value})

const onSubmit = e =>{
    e.preventDefault();
    if(name === '' || email === '' || password ==='' || password2 ==='')
    {
         setAlert('Please set all the fields' , 'danger');
    }else if(password !== password2){
         setAlert('Password do not match' , 'danger')
    }else{
         register({
             name,
             email,
             password
         })
    }
    
}

return(
  < div className="container">
      <h1>
          Account < span className="text-primary"> Register</span>
      </h1>
      <form onSubmit={onSubmit}>
          <div className="form-group">
              <label htmlFor='name' className="text-muted">Name</label>
              <input type="text" className="form-control" name='name' value={name} onChange ={onChange} />
          </div>
          <div className="form-group">
              <label htmlFor='email' className="text-muted">Email Address</label>
              <input type="email" className="form-control" name='email' value={email} onChange ={onChange} />
          </div>
          <div className="form-group">
              <label htmlFor='password' className="text-muted">Password</label>
              <input type="password" className="form-control" name='password' value={password} onChange ={onChange} minLength="6" />
          </div>
          <div className="form-group">
              <label htmlFor='password2' className="text-muted" >Confirm Password</label>
              <input type="password" className="form-control" name='password2' value={password2} onChange ={onChange} minLength="6"  />
          </div>     
          <input type="submit" value="Register" className="btn btn-primary" />                         
      </form>
  </div>
)

}

export default Register