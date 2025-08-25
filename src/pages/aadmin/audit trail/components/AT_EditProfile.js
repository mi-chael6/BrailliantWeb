import './AT_EditProfile.css'

export default function AT_EditProfile({ details, toggle }) {
    const at_detail = details.at_details.at_edit_profile
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
                <label>Name: {at_detail.at_ep_fn_old} {at_detail.at_ep_ln_old}</label>
                <label>Email: {details.at_user}</label>
                <label>Action: <label className='at_bold'>{details.at_action}</label></label>
            </div>
            <div className='at_ep_body'>
                <div>
                    <label className='at_bold'>From</label>
                    <div className='at_card'>

                        <img className='at_user_img' src={at_detail.at_ep_img_old} />
                        <div className='at_info'>
                            <label>Name: {at_detail.at_ep_fn_old} {at_detail.at_ep_ln_old}</label>
                            <label>Email: {at_detail.at_ep_email_old}</label>
                            <label>Date of Birth: {new Date(at_detail.at_ep_dob_old).toISOString().split("T")[0]}</label>
                        </div>
                    </div>
                </div>
                <div>
                    <label className='at_bold'>To</label>
                    <div className='at_card'>
                        <img className='at_user_img' src={at_detail.at_ep_img_new} />
                        <div className='at_info'>
                            <label>Name: {at_detail.at_ep_fn_new} {at_detail.at_ep_ln_new}</label>
                            <label>Email: {at_detail.at_ep_email_new}</label>
                            <label>Date of Birth: {new Date(at_detail.at_ep_dob_new).toISOString().split("T")[0]}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
