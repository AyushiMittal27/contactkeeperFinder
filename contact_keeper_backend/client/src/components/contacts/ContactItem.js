import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({contact}) =>{
    const contactContext = useContext(ContactContext)
    const {deleteContact , setCurrent , clearCurrent} = contactContext

    const {_id, name , email , phone , type} = contact;
    

    const onDelete = ()=>{
         deleteContact(_id);
         clearCurrent();
    }

    return(
        <div className='card bg-light  m-2'>
         <h5 className="text-primary text-left">
             {name}{' '}<span style={{float: 'right'}} className={'badge' + (type === 'professional' ? 
             ' badge-success' :  ' badge-primary')} >
                 {type.charAt(0).toUpperCase() + type.slice(1) }
                 </span> </h5>
                 <ul style={{listStyleType:'none'}} className="list">
                     {email && (<li><i class="fa fa-envelope-open" /> {email}</li>)}
                     {phone && (<li><i class="fa fa-phone"/> {phone} </li>)}
                 </ul>
                 <p>
                     <button className="btn btn-dark btn-small mr-1" onClick={()=> setCurrent(contact)}>  Edit</button>
                     <button className="btn btn-danger btn-small" onClick={onDelete}>Delete</button>
                 </p>

        </div>
    )
}

ContactItem.propTypes={
    contact : PropTypes.object.isRequired
}

export default ContactItem