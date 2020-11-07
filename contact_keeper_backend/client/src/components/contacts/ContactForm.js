import React  , {useState, useContext, useEffect}from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = ()=>{
  const contactContext = useContext(ContactContext)

  const{addContact , current,  clearCurrent , updateContact} = contactContext

  useEffect(()=>{
    if(current!==null){
        setContact(current)
    }else{
        setContact({
            name : '',
            email : '',
            phone: '',
            type: 'personal'
        })
    }
  }, [contactContext , current])

  const[contact , setContact] = useState({
      name: '',
      phone: '',
      email: '',
      type: 'personal'
    })

    const {name , email , phone , type} = contact;

    const onChange = e => setContact({...contact , [e.target.name] : e.target.value});

    const onSubmit = e=>{
        e.preventDefault();
        if(current=== null){
            addContact(contact);
        }else{
            updateContact(contact);
        }
        
        clearAll();
    }

    const clearAll = ()=>{
     clearCurrent();
        
    }

    return(
        <form onSubmit={onSubmit}>
         <h5 className ="text-primary text-center">{current ? 'Edit Contact' : 'Add Contact'} </h5>
         <div className="form-group">
         <input type="text" className="form-control" placeholder="Enter your name"  name ='name' value={name} onChange={onChange} />
         </div>
         <div className="form-group">
         <input type="email" className="form-control" placeholder="Enter your email"  name ='email' value={email} onChange={onChange} />
         </div>
         <div className="form-group">
         <input type="text" className="form-control" placeholder="Enter your phone"  name ='phone' value={phone} onChange={onChange} />
         </div>
         
         <div className="form-check form-check-inline">
         <input type="radio" className="form-check-input" name ='type' value="personal" onChange={onChange} checked={type === 'personal'} />Personal{'  '}
         <input type="radio" className="form-check-input" name ='type' value="professional" onChange={onChange} checked={type === 'professional'} />Professional{''}
         </div>   
         
      
         <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
          {current && (<div className="form-group">
              <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
              </div>)}
          
        </form>
    )
}


export default ContactForm