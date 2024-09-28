import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import '../../Css/group.css';
import Gdetails from '../../Components/Dashboard/gdetails';

const Group = () => {
    const [transaction, setTransaction] = useState(true);
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

    console.log(group);

    return (
        <div className="group-container">
            <div className="group-details">
                {group ? (
                    <>
                        <div className="grp-left">{group_name}</div>
                        <div className="grp-right">
                            <div className="grp-det">
                                <div className='mod-btn' onClick={() => setModalOpen(true)}>{"Details"}</div>
                                <Gdetails isOpen={modalOpen} onClose={() => setModalOpen(false)} />
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
                        <div className="c-tran">Create a New Transaction</div>
                    </>
                    
                )}
            </div>
        </div>
    );
};

export default Group;
