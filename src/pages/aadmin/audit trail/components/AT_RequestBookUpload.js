import './AT_RequestBookUpload.css'

export default function AT_RequestBookUpload({ details, toggle }) {
    const at_detail = details.at_details.at_request_book_upload
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
                <div className='at_book'>
                    <div className='at_img'>
                        <img src={at_detail.rb_img} />
                    </div>
                    <div className='at_info'>
                        <label>Title: {at_detail.rb_title}</label>
                        <label>Author: {at_detail.rb_author}</label>
                        <label>Genre: {at_detail.rb_genre}</label>
                        <label>Date Published: {new Date(at_detail.rb_date_published).toISOString().split("T")[0]}</label>
                        <label>Level: {at_detail.rb_level}</label>
                        <label>Description: {at_detail.rb_description}</label>
                        <label>Request By:{at_detail.request_by}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
