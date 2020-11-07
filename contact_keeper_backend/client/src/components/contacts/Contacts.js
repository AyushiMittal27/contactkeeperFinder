import React, { useContext, Fragment, useEffect } from 'react'
import {CSSTransition , TransitionGroup} from 'react-transition-group'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'

const Contacts = ()=>{

    const contactContext = useContext(ContactContext);
    const {contacts , filtered , getContacts , loading} = contactContext;

    
    useEffect(()=>{
      getContacts()
      //eslint disable next line
    }, [])


    if(!contacts && !loading){
      return <h4> Please add a contact</h4>
    }
    else{
      return(
        <Fragment>
          <TransitionGroup>
            {filtered!== null ? filtered.map(contact =>(
            <CSSTransition key={contact._id} timeout = {500} className="item">
               <ContactItem  contact={contact} />
            </CSSTransition>  
           )):contacts.map(contact=>(
            <CSSTransition key={contact._id} timeout={600} className="item">
            <ContactItem   contact={contact}  />
            </CSSTransition>
          ))}
            </TransitionGroup> 
        
           
          
        </Fragment>
    )
    }
    

}

export default Contacts