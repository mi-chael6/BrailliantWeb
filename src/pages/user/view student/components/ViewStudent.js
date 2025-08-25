import React, { useState, useEffect } from 'react';
import './ViewStudent.css';
import SideNavigation from '../../../../global/components/user/SideNavigation';
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmationModal from '../../../../global/components/user/DeleteConfirmationModal';
import Header from '../../../../global/components/user/Header';

export default function ViewStudent() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [users, setUsers] = useState([]);
    const [bookRead, setBookRead] = useState([]);

    const [isEditing, setIsEditing] = useState(false);

    const location = useLocation();
    const selectedStudent = location.state;

    const [formData, setFormData] = useState({
        student_fname: '',
        student_lname: '',
        student_mi: '',
        student_dob: '',
        student_gender: ''
    });

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')));
        setFormData({
            student_fname: selectedStudent.student_fname,
            student_lname: selectedStudent.student_lname,
            student_mi: selectedStudent.student_mi,
            student_dob: selectedStudent.student_dob,
            student_gender: selectedStudent.student_gender
        });

        axios.get(`http://localhost:8000/api/bookread/${selectedStudent._id}`)
            .then((response) => {
                console.log(response.data)
                setBookRead(response.data.book)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })

    }, [selectedStudent]);

    const toggleConfirmation = () => {
        setShowConfirmation((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        axios
            .put(`https://brailliantweb.onrender.com/api/update/student/${selectedStudent._id}`, formData)
            .then((result) => {
                setIsEditing(false);
            })
            .catch((error) => {
                console.error("Update failed:", error);
            });

        const newAudit = {
            at_user: users.user_email,
            at_date: new Date(),
            at_action: 'Edited Student Detail',
            at_details: {
                at_edit_student_detail: {
                    student_lname_old: selectedStudent.student_lname,
                    student_fname_old: selectedStudent.student_fname,
                    student_mi_old: selectedStudent.student_mi,
                    student_dob_old: selectedStudent.student_dob,
                    student_age_old: selectedStudent.student_age,
                    student_gender_old: selectedStudent.student_gender,
                    student_section_old: selectedStudent.student_section,
                    student_section_name_old: selectedStudent.student_section_name,

                    student_lname_new: formData.student_lname,
                    student_fname_new: formData.student_fname,
                    student_mi_new: formData.student_mi,
                    student_dob_new: formData.student_dob,
                    student_age_new: selectedStudent.student_age,
                    student_gender_new: formData.student_gender,
                    student_section_new: selectedStudent.student_section,
                    student_section_name_new: selectedStudent.student_section_name,
                }
            }
        };
        const result = await axios.post('https://brailliantweb.onrender.com/api/newaudittrail', newAudit);
        console.log(result.data)
    };

    const handleCancel = () => {
        setFormData({
            student_fname: selectedStudent.student_fname,
            student_lname: selectedStudent.student_lname,
            student_mi: selectedStudent.student_mi,
            student_dob: selectedStudent.student_dob,
            student_gender: selectedStudent.student_gender
        });
        setIsEditing(false);
    };

    const handleDelete = async () => {
        axios
            .delete(`https://brailliantweb.onrender.com/api/delete/student/${selectedStudent._id}`)
            .then(() => {
                navigate('/class');
            })
            .catch((error) => {
                console.log("Delete error: ", error);
            });
        const newAudit = {
            at_user: users.user_email,
            at_date: new Date(),
            at_action: 'Removed Student',
            at_details: {
                at_remove_student: {
                    student_lname: selectedStudent.student_lname,
                    student_fname: selectedStudent.student_fname,
                    student_mi: selectedStudent.student_mi,
                    student_dob: selectedStudent.student_dob,
                    student_age: selectedStudent.student_age,
                    student_gender: selectedStudent.student_gender,
                    student_section: selectedStudent.student_section,
                    student_section_name: selectedStudent.student_section_name,
                }
            }
        };
        await axios.post('https://brailliantweb.onrender.com/api/newaudittrail', newAudit);
    };

    const formatTime = (secs) => {
        const h = String(Math.floor(secs / 3600)).padStart(2, "0");
        const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
        const s = String(secs % 60).padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    return (
        <div className='container'>
            <SideNavigation />
            <div className='vs-container'>
                <div className='vs-header'>
                    <Header page={"View Student"} searchBar={false} />
                </div>
                {showDropdown && <DropDownMenu />}
                {showConfirmation && (
                    <DeleteConfirmationModal
                        onDelete={handleDelete}
                        onCancel={toggleConfirmation}
                    />
                )}
                <div className='vs-body'>
                    <div className='view-student'>
                        <button className='back-btn' onClick={() => navigate(-1)}>
                            <img src={require('../../../../global/asset/back.png')} />
                        </button>
                        <label className='vs-student'>{formData.student_lname}, {formData.student_fname}</label>
                        <div className='vs'>
                            <div className='view-student-detail'>
                                <div className='vs2'>
                                    <label>Last Name:</label>
                                    <input
                                        name='student_lname'
                                        value={formData.student_lname}
                                        onChange={handleChange}
                                        readOnly={!isEditing}
                                    />
                                </div>
                                <div className='vs1'>
                                    <div className='vs2'>
                                        <label>First Name:</label>
                                        <input
                                            name='student_fname'
                                            value={formData.student_fname}
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                    <div className='vs2'>
                                        <label>Middle Initial:</label>
                                        <input
                                            name='student_mi'
                                            value={formData.student_mi}
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className='vs1'>
                                    <div className='vs2'>
                                        <label>Date of Birth:</label>
                                        <input
                                            name='student_dob'
                                            type='date'
                                            value={formData.student_dob.slice(0, 10)}
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                    <div className='vs2'>
                                        <label>Gender:</label>
                                        <select
                                            name='student_gender'
                                            value={formData.student_gender}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='vs-buttons'>
                                    {isEditing ? (
                                        <>
                                            <button className='vs-edit' onClick={handleSave}>
                                                Save
                                            </button>
                                            <button className='vs-remove' onClick={handleCancel}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='vs-edit' onClick={() => setIsEditing(true)}>
                                                Edit Details <img src={require('../assets/edit.png')} />
                                            </button>
                                            <button className='vs-remove' onClick={toggleConfirmation}>
                                                Remove <img src={require('../assets/remove.png')} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className='view-student-rh'>
                                <label>Reading History:</label>
                                <div className='reading-history'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Book</th>
                                                <th>Time Elapsed</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookRead?.map((book, index) => (
                                                <tr key={index}>
                                                    <td>{book.book_read_title}</td>
                                                    <td>
                                                        {book.book_read_time_elapsed != null
                                                            ? formatTime(book.book_read_time_elapsed)
                                                            : ""}
                                                    </td>
                                                    <td>
                                                        {book.book_read_date
                                                            ? new Date(book.book_read_date).toLocaleString()
                                                            : ""}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
