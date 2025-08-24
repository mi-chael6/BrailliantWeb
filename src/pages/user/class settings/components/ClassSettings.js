import React, { useState, useEffect } from 'react';
import { BrowserRouter, useNavigate, Route, Routes } from 'react-router-dom'
import './ClassSettings.css'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import SideNavigation from '../../../../global/components/user/SideNavigation'
import Header from '../../../../global/components/user/Header'
import axios from 'axios'

export default function ClassSettings() {

    const navigate = useNavigate()

    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])
    const [sections, setSections] = useState([])
    const [students, setStudents] = useState([])

    const [studentCount, setStudentCount] = useState(0);
    const [sectionCount, setSectionCount] = useState(0);
    const [selectedSection, setSelectedSection] = useState('')

    const [searchQuery, setSearchQuery] = useState('');

    const user = JSON.parse(localStorage.getItem('users'));


    useEffect(() => {
        axios.get(`https://brailliantweb.onrender.com/api/allsections/${user._id}`)
            .then((response) => {
                setSectionCount(response.data.sections.length)
                console.log(response.data)
                setSections(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
        axios.get(`https://brailliantweb.onrender.com/api/allstudents/${user._id}`)
            .then((response) => {
                setStudentCount(response.data.students.length)
                console.log(response.data)
                setStudents(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
        console.log(sections)
    };
    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='cs-container'>
                <div className='cs-header'>
                    <Header page={"Class Settings"} searchBar={false} />
                </div>
                {showDropdown && <DropDownMenu />}
                <div className='cs-body'>
                    <div className='cs-action'>
                        <div className='cs-buttons'>
                            <button className='create-section' onClick={() => { navigate('/section/create') }}><img src={require('../assets/orange.png')} />Create Section</button>
                            <button className='add-student' onClick={() => { navigate('/student/add') }}><img src={require('../assets/black.png')} />Add Student</button>
                        </div>
                        <div className='cs-num'>
                            <div className='cs-students'>
                                <div className='cs-students-img'>
                                    <img src={require('../assets/students.png')} />
                                </div>
                                <div className='cs-students-count'>
                                    <label className='count'>{studentCount}</label>
                                    <label className='c'>Students</label>
                                </div>

                            </div>
                            <div className='cs-sections'>
                                <div className='cs-sections-img'>
                                    <img src={require('../assets/section.png')} />
                                </div>
                                <div className='cs-section-count'>
                                    <label className='count'>{sectionCount}</label>
                                    <label className='c'>Sections</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cs-list'>
                        <div className='cs-table'>
                            <div className='cs-table-navigation'>
                                <input
                                    type="text"
                                    placeholder="Search students"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                                />
                                <select
                                    value={selectedSection.student_section}
                                    onChange={(e) => setSelectedSection(e.target.value)}
                                >
                                    <option value="">Select Section</option>
                                    {sections.sections?.map((section) => (
                                        <option key={section._id} value={section._id}>
                                            {section.section_level} {section.section_name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className='edit-section'
                                    onClick={() => {
                                        if (!selectedSection) {
                                            alert("Please select a section.");
                                            return;
                                        }
                                        navigate('/section/edit', { state: { section: selectedSection } });
                                    }}
                                >
                                    <img src={require('../assets/orange.png')} />
                                    Edit Section
                                </button>
                            </div>
                            <div className='cs-tbl-cont'>
                                <table >
                                    <tr>
                                        <th>ID</th>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>Middle Initial</th>
                                        <th>Birthdate</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Section</th>
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
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => navigate('/student/view', { state: student })}
                                            >
                                                <td>{student._id}</td>
                                                <td>{student.student_lname}</td>
                                                <td>{student.student_fname}</td>
                                                <td>{student.student_mi}</td>
                                                <td>{new Date(student.student_dob).toLocaleDateString()}</td>
                                                <td>{student.student_age}</td>
                                                <td>{student.student_gender}</td>
                                                <td>{student.student_section_name}</td>
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
