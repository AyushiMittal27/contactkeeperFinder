import React , {useContext, useEffect} from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

const Home = ()=>{
  const authContext = useContext(AuthContext)

  useEffect(()=>{
      authContext.loadUser();
      //eslint-disable-next-line
  }, [])

    return (
    <div className="row mt-3">
        <div className="col-5">
            <ContactForm />
        </div>
        <div className="col-7"> 
        <ContactFilter />
        <Contacts /> 
        </div>
    </div>
)

}

export default Home