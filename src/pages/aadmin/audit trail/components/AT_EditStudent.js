import './AT_EditStudent.css'

export default function AT_EdutStudent({ details, toggle }) {
    const at_detail = details.at_details.at_edit_student_detail
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
            <div className='a_body'>
                <div className='la'>
                    <label className='at_bold'>From</label>
                    <div className='at_card'>
                        <div className='at_info'>
                            <label>Student Name: {at_detail.student_fname_old} {at_detail.student_mi_old} {at_detail.student_lname_old}</label>
                            <label>Gender: {at_detail.student_gender_old}</label>
                            <label>Date of Birth: {new Date(at_detail.student_dob_old).toISOString().split("T")[0]}</label>
                            <label>Section: {at_detail.student_section_name_old}</label>
                            <label>Section ID: {at_detail.student_section_old}</label>
                        </div>
                    </div>
                </div>
                <div>
                    <label className='at_bold'>To</label>
                    <div className='at_card'>
                        <div className='at_info'>
                            <label>Student Name: {at_detail.student_fname_new} {at_detail.student_mi_new} {at_detail.student_lname_new}</label>
                            <label>Gender: {at_detail.student_gender_new}</label>
                            <label>Date of Birth: {new Date(at_detail.student_dob_new).toISOString().split("T")[0]}</label>
                            <label>Section: {at_detail.student_section_name_new}</label>
                            <label>Section ID: {at_detail.student_section_new}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
