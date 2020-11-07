import React , {useReducer} from 'react';
import axios from 'axios'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import { ADD_CONTACT, DELETE_CONTACT, CLEAR_CURRENT , SET_CURRENT , UPDATE_CONTACT, CLEAR_FILTER, FILTER_CONTACTS, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS } from '../types'


const ContactState = props=>{
    const initialState= {
    contacts : null,
    current : null,
    filtered : null,
    error : null
}

const [state , dispatch] = useReducer(ContactReducer , initialState);

//Get Contacts
const getContacts = async () =>{
    try{
      const res= await axios.get('/api/contacts')
      console.log(res , 'data');
      dispatch({
          type : GET_CONTACTS,
          payload : res.data
      })
    }catch(err){
      dispatch({
          type:CONTACT_ERROR,
          payload: err.response.msg
      })
    }
}

//Add contact
const addContact= async contact =>{
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    try{
        const res= await axios.post('/api/contacts' , contact , config);
        dispatch({type: ADD_CONTACT , payload:res.data})
    }catch(err){
        dispatch({type :CONTACT_ERROR, payload: err.response.msg})
    }
    
}

//Delete contact
const deleteContact = async (id) =>{
    try{
          await axios.delete(`/api/contacts/${id}`)
          dispatch({type : DELETE_CONTACT , payload: id})
    }catch(err){
          dispatch({type : CONTACT_ERROR , payload : err.response.msg})
    }

    
}

// clear Contacts
const clearContacts = ()=>{
    dispatch({type:CLEAR_CONTACTS})
}

//Set current contact
 const setCurrent = contact =>{
     dispatch({type: SET_CURRENT , payload : contact})
 }

//clear current contact
const clearCurrent = contact =>{
    dispatch({type: CLEAR_CURRENT})
}

//update contact
const updateContact = async (contact) =>{
    const config ={
        headers:{
            'Content-Type' : 'application/json'
        }
    }
    try{   
        const res= await axios.put(`/api/contacts/${contact._id}`, contact, config)
        dispatch({type: UPDATE_CONTACT , payload: res.data});
    }catch(err){
        dispatch({type:CONTACT_ERROR , payload: err.response.msg})
    }
    
}

//filter contact
const filterContacts = text =>{
    dispatch({type : FILTER_CONTACTS , payload: text})
}


//clear Filter
const clearFilter = ()=>{
    dispatch({type:CLEAR_FILTER })
}


 return (
     <ContactContext.Provider value={{
         contacts : state.contacts,
         current: state.current,
         filtered: state.filtered,
         error: state.error,
         addContact,
         getContacts,
         deleteContact,
         setCurrent,
         clearCurrent,
         updateContact,
         filterContacts,
         clearFilter,
         clearContacts
         
     }}>
         {props.children}
     </ContactContext.Provider>
 )
}

export default ContactState