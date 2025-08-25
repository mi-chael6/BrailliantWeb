import './AT_AddStudent.css'

export default function AT_AddStudent({ details, toggle }) {
    const at_detail = details.at_details.at_add_student
    return (
        <div className="at_ep_container">
            <div className='at_header'>
                <div className=''>
                    <label className='at_ep_title'>Audit Trail Details Report</label>
                    <button onClick={() => {
                        toggle(false)
                    }}>
                        <img src={require("../assets/xx.png")} alt="close" />
                    </button>
                </div>
                <div className='at_header_top'>
                    <label>Audit ID: {details._id}</label>
                    <label>Date: {new Date(details.at_date).toLocaleString()}</label>
                </div>
                <label>Email: {details.at_user}</label>
                <label>Action: <label className='at_bold'>{details.at_action}</label></label>
            </div>
            <div className='at_body'>
                <label>Student Name: {at_detail.student_fname} {at_detail.student_mi} {at_detail.student_lname}</label>
                <label>Gender: {at_detail.student_gender}</label>
                <label>Date of Birth: {new Date(at_detail.student_dob).toISOString().split("T")[0]}</label>
                <label>Section: {at_detail.student_section_name}</label>
                <label>Instructor: {at_detail.student_instructor}</label>
            </div>
        </div>
    )
}
