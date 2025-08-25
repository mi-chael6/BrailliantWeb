import './AT_ActivateAccount.css'

export default function AT_ActivateAccount({ details, toggle }) {
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
        </div>
    )
}
