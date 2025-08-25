import './AT_CreateSection.css'

export default function AT_CreateSection({ details, toggle }) {
    const at_detail = details.at_details.at_create_section
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
                <label>Section Name: {at_detail.section_name}</label>
                <label>Section Level:{at_detail.section_level}</label>
            </div>
        </div>
    )
}
