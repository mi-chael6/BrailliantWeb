import React, { useState, useEffect } from 'react';
import './AuditTrail.css'
import AdminSideNavigation from '../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../global/components/admin/AdminHeader'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuditTrail() {

    const navigate = new useNavigate()


    const title = "Audit Trail"

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [allAudits, setAllAudits] = useState([]);
    const audits = allAudits.audit_trail || [];
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        axios.get('https://brailliantweb.onrender.com/api/allaudittrail')
            .then((response) => {
                setAllAudits(response.data)
                console.log('this books', response.data)

            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    }, [])

    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='admin-cr-container'>
                <div className='admin-cr-header'>
                    <AdminHeader title={title} />
                </div>
                <div className='admin-cr-body'>
                    <div className='admin-content-request'>

                        <div className='admin-cr-accounts'>
                            <label className='all-req'>All Audits</label>
                            <div className='admin-cr-request'>
                                <div className='cr-details'>
                                    <label className='cr-count'>{audits.length}</label>
                                    <label className='cr-text'>Audits</label>
                                </div>

                            </div>
                        </div>
                        <div className='admin-request'>
                            <div className='admin-request-actions'>
                                <input
                                    placeholder='Search audit'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                                />
                                <div className='admin-request-buttons'>
                                    {/*<button>Remove <img src={require('../assets/delete.png')} /></button>*/}
                                </div>
                            </div>
                            <div className='cr-table'>
                                <table className='admin-cr-table'>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Action</th>
                                        <th>Date</th>
                                    </tr>
                                    {allAudits.audit_trail
                                        ?.filter(
                                            (audit) =>
                                                audit.at_action?.toLowerCase().includes(searchQuery) ||
                                                audit.at_user?.toLowerCase().includes(searchQuery) ||
                                                audit.at_date?.toLowerCase().includes(searchQuery)
                                        )
                                        .sort((a, b) => new Date(b.at_date) - new Date(a.at_date))
                                        .map((audit) => (
                                            <tr
                                                key={audit._id}
                                                onClick={() => setSelectedRowId(audit._id)}
                                                className={selectedRowId === audit._id ? "highlighted" : ""}
                                            >
                                                <td>{audit._id}</td>
                                                <td>{audit.at_user}</td>
                                                <td>{audit.at_action}</td>
                                                <td>{new Date(audit.at_date).toLocaleString()}</td>
                                                <td>
                                                    <button>View Details</button>
                                                </td>
                                            </tr>
                                        ))}

                                </table>
                            </div>

                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}
