import React, { useState, useEffect, useRef } from 'react';
import './AuditTrail.css'
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import AT_EditProfile from './AT_EditProfile';
import AT_RequestBookUpload from './AT_RequestBookUpload';
import AT_ActivateAccount from './AT_ActivateAccount';
import AT_CreateSection from './AT_CreateSection';
import AT_DeleteSection from './AT_DeleteSection';
import AT_AddStudent from './AT_AddStudent';
import AT_RemoveStudent from './AT_RemoveStudent';
import AT_EditStudent from './AT_EditStudent';
import AT_PasswordChange from './AT_PasswordChange';

export default function AuditTrail() {

    const navigate = new useNavigate()

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [allAudits, setAllAudits] = useState([]);
    const audits = allAudits.audit_trail || [];
    const [searchQuery, setSearchQuery] = useState('');
    const [isShortened, setIsShortened] = useState(false);
    const [actions, setAction] = useState("");
    const [audit, setAudit] = useState([]);



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

    const toggleAuditTrailDetail = (action) => {
        setIsShortened(true);
        setAction(action.at_action)
        setAudit(action)
        console.log(action)
    }

    const toggleClose = () => {

    }

    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='admin-cr-container'>
                <div className='admin-cr-header'>
                    <AdminHeader page={"Audit Trail"} />
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
                            <div className={`cr-table ${isShortened ? "shortened" : ""}`}>
                                <table className='admin-cr-table'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>User</th>
                                            <th>Action</th>
                                            <th>Date</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
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
                                                        <button onClick={() => { toggleAuditTrailDetail(audit) }}>
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>

                            </div>
                            {
                                (() => {
                                    switch (actions) {
                                        case "Edited Profile":
                                            return (
                                                <AT_EditProfile
                                                    details={audit}
                                                    toggle={() => {
                                                        setIsShortened(false);
                                                        setAction("");
                                                    }}
                                                />
                                            );
                                        case "Requested Upload Material":
                                            return (
                                                <AT_RequestBookUpload
                                                    details={audit}
                                                    toggle={() => {
                                                        setIsShortened(false);
                                                        setAction("");
                                                    }}
                                                />
                                            );
                                        case "Activated Account":
                                            return (
                                                <AT_ActivateAccount
                                                    details={audit}
                                                    toggle={() => {
                                                        setIsShortened(false);
                                                        setAction("");
                                                    }}
                                                />
                                            );
                                        case "Created Section":
                                            return (
                                                <AT_CreateSection
                                                    details={audit}
                                                    toggle={() => {
                                                        setIsShortened(false);
                                                        setAction("");
                                                    }}
                                                />
                                            );
                                        case "Deleted Section":
                                            return (
                                                <AT_DeleteSection
                                                    details={audit}
                                                    toggle={() => {
                                                        setIsShortened(false);
                                                        setAction("");
                                                    }}
                                                />
                                            );
                                        case "Added Student":
                                            return (
                                                <AT_AddStudent
                                                    details={audit}
                                                    toggle={() => {
                                                        setIsShortened(false);
                                                        setAction("");
                                                    }}
                                                />
                                            );
                                        case "Removed Student":
                                            return (
                                                <AT_RemoveStudent
                                                    details={audit}
                                                    toggle={() => {
                                                        setIsShortened(false);
                                                        setAction("");
                                                    }}
                                                />
                                            );
                                        case "Edited Student Detail":
                                            return (
                                                <AT_EditStudent
                                                    details={audit}
                                                    toggle={() => {
                                                        setIsShortened(false);
                                                        setAction("");
                                                    }}
                                                />
                                            );
                                        case "Password Changed":
                                            return (
                                                <AT_PasswordChange
                                                    details={audit}
                                                    toggle={() => {
                                                        setIsShortened(false);
                                                        setAction("");
                                                    }}
                                                />
                                            );
                                    }
                                })()
                            }


                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}
