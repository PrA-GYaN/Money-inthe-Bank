import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import '../../Css/group.css';
import Gdetails from '../../Components/Dashboard/gdetails';
import Transaction_create from '../../Components/Dashboard/Transaction.create';

const Group = () => {
    const [transaction, setTransaction] = useState(true);
    const [detailsmodal, setdetailsOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [group, setGroup] = useState(null);
    const [group_name, setGroupName] = useState('goa');

    const fetchGroup = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/groups/name/${group_name}`);
            console.log(response.data);
            setGroup(response.data);
            setGroupName(response.data.group_name);
        } catch (err) {
            console.error(err);
            setGroup(null);
        }
    };

    useEffect(() => {
        fetchGroup();
    }, []);



    return (
        <div className="group-container">
            <div className="group-details">
                {group ? (
                    <>
                        <div className="grp-left">{group_name}</div>
                        <div className="grp-right">
                            <div className="grp-det">
                                <div className='mod-btn' onClick={() => setdetailsOpen(true)}>{"Details"}</div>
                                <Gdetails isOpen={detailsmodal} onClose={() => setdetailsOpen(false)} />
                            </div>
                            <div className="grp-invite">{"group.invite"}</div>
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="group-body">
                {group && group.transactions != 0 ? (
                    group.transactions.map((transaction, index) => (
                        <div key={index}>{transaction}</div>
                    ))
                ) : (
                    <>
                        <div className='mod-btn' onClick={() => setModalOpen(true)}>{"Create a New Transaction"}</div>
                        <Transaction_create isOpen={modalOpen} onClose={() => setModalOpen(false)} grp_id={group}/>
                    </>
                    
                )}
            </div>
        </div>
    );
};

export default Group;
