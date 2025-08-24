import React, { useState, useEffect } from 'react';
import './EditSection.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmationModal from '../../../../global/components/user/DeleteConfirmationModal';
import Header from '../../../../global/components/user/Header';


export default function EditSection() {

    const navigate = new useNavigate()

    const [showDropdown, setShowDropdown] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [users, setUsers] = useState([])

    const [section, setSection] = useState([])
    const [students, setStudents] = useState([])

    const [selectedRowId, setSelectedRowId] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');


    const location = useLocation();
    const selectedSection = location.state?.section;

    const user = JSON.parse(localStorage.getItem('users'));
    if (!user) {
        navigate(-1)
    }

    useEffect(() => {
        if (selectedSection) {
            axios
                .get(`https://brailliantweb.onrender.com/api/section/${selectedSection}`)
                .then((response) => {
                    console.log("Full section data:", response.data);
                    setSection(response.data.section);
                })
                .catch((error) => {
                    console.log("Section fetch error: ", error);
                });
        }

        axios.get('https://brailliantweb.onrender.com/api/allstudents')
            .then((response) => setStudents(response.data))
            .catch((error) => console.log("Student fetch error: " + error));

        setUsers(JSON.parse(localStorage.getItem('users')));
    }, []);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };
    const toggleConfirmation = () => {
        setShowConfirmation((prev) => !prev);
    };

    const handleDelete = async () => {
        
        const newAudit = {
            at_user: users.user_email,
            at_date: new Date(),
            at_action: 'Deleted Section',
            at_details: {
                at_delete_section: {
                    section_name: section.section_name,
                    section_level: section.section_level,
                },
            }
        };
        await axios.post('https://brailliantweb.onrender.com/api/newaudittrail', newAudit);

        axios
            .delete(`https://brailliantweb.onrender.com/api/delete/student/section/${section._id}`)
            .then((response) => {
                console.log("Full section data:", response.data);
            })
            .catch((error) => {
                console.log("Section fetch error: ", error);
            });
        axios
            .delete(`https://brailliantweb.onrender.com/api/delete/section/${section._id}`)
            .then((response) => {
                console.log("Full section data:", response.data);

            })
            .catch((error) => {
                console.log("Section fetch error: ", error);
            });
        navigate('/class')



    };
    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='es-container'>
                <div className='es-header'>
                    <Header page={"Edit Section"} searchBar={false} />
                </div>
                {showDropdown && <DropDownMenu />}
                {showConfirmation && (
                    <DeleteConfirmationModal
                        onDelete={handleDelete}
                        onCancel={toggleConfirmation}
                    />
                )}
                <div className='es-body'>
                    <div className='edit-sect'>
                        <div className='es-title'>
                            <div>
                                <button className='back-btn' onClick={() => { navigate(-1) }}><img src={require('../../../../global/asset/back.png')} /></button>
                                <label className='level-section'>
                                    {section?.section_level ?? 'Loading...'} {section?.section_name ?? ''}
                                </label>
                            </div>

                            <div className='es-students'>
                                <div className='es-students-img'>
                                    <img src={require('../assets/students.png')} />
                                </div>
                                <div className='es-students-count'>
                                    <label className='count'>
                                        {students.students?.filter(student => student.student_section === selectedSection).length || 0}
                                    </label>
                                    <label className='c'>STUDENTS</label>
                                </div>
                            </div>
                        </div>
                        <div className='es-navigate'>
                            <div className='es-left'>
                                <input
                                    className='es-search'
                                    placeholder='Search student'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                                />
                            </div>
                            <div className='es-buttons'>
                                <button onClick={() => {
                                    if (!selectedRowId) {
                                        alert("Please select a student.");
                                        return;
                                    }
                                    navigate('/student/view', { state: selectedRowId })

                                }}>Edit Student Details  <img src={require('../assets/edit.png')} /></button>
                                <button
                                    onClick={() => {

                                        toggleConfirmation()
                                    }}

                                >Delete Section <img src={require('../assets/remove.png')} /></button>
                            </div>
                        </div>
                        <div className='es-table'>
                            <table >
                                <tr>
                                    <th>ID</th>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Middle Initial</th>
                                    <th>Birthdate</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                </tr>
                                {students.students
                                    ?.filter((student) => {
                                        const matchesSection = selectedSection ? student.student_section === selectedSection : true;
                                        const matchesSearch =
                                            student.student_fname.toLowerCase().includes(searchQuery) ||
                                            student.student_lname.toLowerCase().includes(searchQuery) ||
                                            student.student_mi?.toLowerCase().includes(searchQuery);
                                        return matchesSection && matchesSearch;
                                    })
                                    .map((student) => (
                                        <tr
                                            key={student._id}
                                            onClick={() => setSelectedRowId(student)}
                                            className={selectedRowId === student ? "highlighted" : ""}
                                        //onClick={() => navigate('/student/view', { state: student })}
                                        >
                                            <td>{student._id}</td>
                                            <td>{student.student_lname}</td>
                                            <td>{student.student_fname}</td>
                                            <td>{student.student_mi}</td>
                                            <td>{new Date(student.student_dob).toLocaleDateString()}</td>
                                            <td>{student.student_age}</td>
                                            <td>{student.student_gender}</td>
                                        </tr>
                                    ))}
                            </table>
                        </div>
                        <button onClick={() => { navigate('/class') }} className='es-save'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
