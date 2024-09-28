import React,{useState} from 'react'
import '../../Css/group.css'
const Group = () => {
    const [transaction, setTransaction]= useState(true);
  return (
    <>
    <div className="group-container">
        <div className="group-details">
            <div className="grp-left">{"Group.name"}</div>
            <div className="grp-right">
                <div className="grp-det">{"Group.details"}</div>
                <div className="grp-invite">{"Group.invite"}</div>
            </div>
        </div>
        <div className="group-body">
            {
                transaction?
                ("Transaction.List"):("Create a new transaction")
            }
        </div>
    </div>
    </>
  )
}

export default Group