import React , {useContext} from 'react'
import ALertContext from '../../context/alert/alertContext'
import AlertContext from '../../context/alert/alertContext'

const Alerts = ()=>{
    const alertContext = useContext (AlertContext)

    return(
      alertContext.alerts.length > 0 && alertContext.alerts.map(alert =>(
          <div key={alert.id} className={`alert alert-${alert.type}`}>
              <i class='fa fa-info-circle' /> {alert.msg}
          </div>   
      ))
    )
}

export default Alerts