import React, { useState, useEffect } from 'react';
import './AddStudent.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import Header from '../../../../global/components/user/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function AddStudent() {

    const navigate = new useNavigate()

    const user = JSON.parse(localStorage.getItem('users'));
    if (!user) {
        navigate(-1)
    }

    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])
    const [sections, setSections] = useState([])
    const [students, setStudents] = useState([])
    const [selectedSection, setSelectedSection] = useState('')

    const [newStudent, setNewStudent] = useState({
        student_lname: '',
        student_fname: '',
        student_mi: '',
        student_dob: '',
        student_gender: '',
        student_section: '',
        student_section_name: '',
    });

    useEffect(() => {
        axios.get(`https://brailliantweb.onrender.com/api/allsections/${user._id}`)
            .then((response) => {
                setSections(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
        setUsers(JSON.parse(localStorage.getItem('users')))
        console.log(user._id + " this id")
    }, [])

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const studentList = (id) => {
        axios.get(`https://brailliantweb.onrender.com/api/allstudents/section/${id}`)
            .then((response) => {
                setStudents(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        ///////////////////////VALIDATIONS
        if (!newStudent.student_lname.trim()) {
            alert("Last name is required.");
            return;
        }
        if (!newStudent.student_fname.trim()) {
            alert("First name is required.");
            return;
        }
        if (!/^[A-Za-z]+$/.test(newStudent.student_lname)) {
            alert("Last name must contain only letters.");
            return;
        }
        if (!/^[A-Za-z]+$/.test(newStudent.student_fname)) {
            alert("First name must contain only letters.");
            return;
        }
        if (newStudent.student_mi && !/^[A-Za-z]{1}$/.test(newStudent.student_mi)) {
            alert("Middle initial must be a single letter.");
            return;
        }
        if (!newStudent.student_dob) {
            alert("Date of Birth is required.");
            return;
        }

        const today = new Date();
        const enteredDate = new Date(newStudent.student_dob);
        if (enteredDate > today) {
            alert("Date of Birth cannot be in the future.");
            return;
        }
        if (!newStudent.student_gender) {
            alert("Please select a gender.");
            return;
        }
        if (!newStudent.student_section) {
            alert("Please select a section.");
            return;
        }
        ///////////////////////////////////////////////////////////////////
        var section = null
        await axios.get(`https://brailliantweb.onrender.com/api/section/id/${selectedSection}`,)
            .then((res) => {
                section = res.data.section.section_name
                const updatedNewStudent = { ...newStudent, student_section_name: section, student_instructor: user._id }
                axios.post('https://brailliantweb.onrender.com/api/newstudent', updatedNewStudent)
                    .then((res) => {
                        console.log("Student added:", res.data);
                        alert("Student added successfully!");
                        setNewStudent({
                            student_lname: '',
                            student_fname: '',
                            student_mi: '',
                            student_dob: '',
                            student_gender: '',
                        });
                        //navigate('/class')
                        studentList(newStudent.student_section)
                    })
                    .catch((error) => {
                        console.error("Failed to add student", error);
                        alert("Failed to add student. Please try again.");
                    });
            })
            .catch((error) => {
                console.log(error);
            });

        /////////////////////////////////////////////////////////////////////
        const updatedData = { user_recent_act: 'Added Student' };
        axios.put(`https://brailliantweb.onrender.com/api/update/user/${users._id}`, updatedData)
            .then(() => {
                console.log(updatedData, "this after update");
            })
            .catch((error) => {
                console.log(error);
            });




        const newAudit = {
            at_user: users.user_email,
            at_date: new Date(),
            at_action: 'Added Student',
            at_details: {
                at_add_student: {
                    student_lname: newStudent.student_lname,
                    student_fname: newStudent.student_fname,
                    student_mi: newStudent.student_mi,
                    student_dob: newStudent.student_dob,
                    //student_age: newStudent.student_age,
                    student_gender: newStudent.student_gender,
                    student_section: newStudent.student_section,
                    student_section_name: section,
                    student_instructor: user.user_email,
                },
            }
        };
        const result = await axios.post('https://brailliantweb.onrender.com/api/newaudittrail', newAudit);
        console.log(result)
    };


    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='as-container'>
                <div className='as-header'>
                    <Header page={"Add Student"} searchBar={false} />
                </div>
                {showDropdown && <DropDownMenu />}
                <div className='as-body'>
                    <div className='back-container'>
                        <button className='back-btn' onClick={() => { navigate(-1) }}><img src={require('../../../../global/asset/back.png')} /></button>
                    </div>
                    <div className='as-body-cont'>
                        <form className='as'>
                            <div className='as1'>

                                <div className='as2'>
                                    <label>Section:</label>
                                    <select
                                        value={newStudent.student_section}
                                        onChange={(e) => {
                                            setSelectedSection(e.target.value)
                                            setNewStudent({ ...newStudent, student_section: e.target.value })
                                            studentList(e.target.value)
                                        }
                                        }
                                    >
                                        <option value="">Select Section</option>
                                        {sections.sections?.map((section) => (
                                            <option key={section._id} value={section._id}>
                                                {section.section_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className='as1'>
                                <div className='as2'>
                                    <label>Last Name:</label>
                                    <input
                                        type='text'
                                        value={newStudent.student_lname}
                                        onChange={(e) => setNewStudent({ ...newStudent, student_lname: e.target.value })}
                                    />
                                </div>
                                <div className='as2'>
                                    <label>First Name:</label>
                                    <input
                                        type='text'
                                        value={newStudent.student_fname}
                                        onChange={(e) => setNewStudent({ ...newStudent, student_fname: e.target.value })}
                                    />
                                </div>
                                <div className='as2'>
                                    <label>Middle Initial:</label>
                                    <input
                                        type='text'
                                        value={newStudent.student_mi}
                                        onChange={(e) => setNewStudent({ ...newStudent, student_mi: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className='as1'>
                                <div className='as2'>
                                    <label>Date of Birth:</label>
                                    <input
                                        type='date'
                                        value={newStudent.student_dob}
                                        onChange={(e) => setNewStudent({ ...newStudent, student_dob: e.target.value })}
                                    />
                                </div>
                                <div className='as2'>
                                    <label>Gender:</label>
                                    <select
                                        value={newStudent.student_gender}
                                        onChange={(e) => setNewStudent({ ...newStudent, student_gender: e.target.value })}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <button className='as-add' onClick={handleAddStudent} > <img src={require('../assets/add.png')} />Add Student</button>
                        </form>
                        <div className='add-students'>
                            <table>
                                <tr>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Middle Initial</th>
                                    <th>Birthdate</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                </tr>

                                {students.students?.map((student) => (
                                    <tr
                                        key={student._id}
                                        style={{ cursor: 'pointer' }}
                                    >
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

                    </div>

                </div>
            </div>
        </div>
    )
}
