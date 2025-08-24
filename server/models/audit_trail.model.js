const mongoose = require('mongoose')
const { Schema, model } = mongoose

const AuditTrailSchema = new Schema({
    at_action: {
        type: String
    },
    at_user: {
        type: String
    },
    at_date: {
        type: Date
    },
    role: {
        type: String
    },
    at_details: {
        at_edit_profile: {
            at_ep_fn_old: {
                type: String
            },
            at_ep_ln_old: {
                type: String
            },
            at_ep_dob_old: {
                type: Date
            },
            at_ep_email_old: {
                type: String
            },
            at_ep_img_old: {
                type: String
            },

            at_ep_fn_new: {
                type: String
            },
            at_ep_ln_new: {
                type: String
            },
            at_ep_dob_new: {
                type: Date
            },
            at_ep_email_new: {
                type: String
            },
            at_ep_img_new: {
                type: String
            },
        },
        at_activate_account: {
            type: String
        },
        at_request_book_upload: {
            rb_title: {
                type: String
            },
            rb_author: {
                type: String
            },
            rb_genre: {
                type: String
            },
            rb_date_published: {
                type: Date
            },
            rb_level: {
                type: String
            },
            rb_description: {
                type: String
            },
            rb_img: {
                type: String
            },
            rb_file: {
                type: String
            },
            request_by: {
                type: String
            }
        },
        at_create_section: {
            section_name: {
                type: String
            },
            section_level: {
                type: String
            },
            section_instructor: {
                type: String
            }
        },
        at_delete_section: {
            section_name: {
                type: String
            },
            section_level: {
                type: String
            },
        },
        at_add_student: {
            student_lname: {
                type: String
            },
            student_fname: {
                type: String
            },
            student_mi: {
                type: String
            },
            student_dob: {
                type: Date
            },
            student_age: {
                type: Number
            },
            student_gender: {
                type: String
            },
            student_section: {
                type: String
            },
            student_section_name: {
                type: String
            },
            student_instructor: {
                type: String
            },
        },
        at_remove_student: {
            student_lname: {
                type: String
            },
            student_fname: {
                type: String
            },
            student_mi: {
                type: String
            },
            student_dob: {
                type: Date
            },
            student_age: {
                type: Number
            },
            student_gender: {
                type: String
            },
            student_section: {
                type: String
            },
            student_section_name: {
                type: String
            },
        },
        at_edit_student_detail: {
            student_lname_old: {
                type: String
            },
            student_fname_old: {
                type: String
            },
            student_mi_old: {
                type: String
            },
            student_dob_old: {
                type: Date
            },
            student_age_old: {
                type: Number
            },
            student_gender_old: {
                type: String
            },
            student_section_old: {
                type: String
            },
            student_section_name_old: {
                type: String
            },

            student_lname_new: {
                type: String
            },
            student_fname_new: {
                type: String
            },
            student_mi_new: {
                type: String
            },
            student_dob_new: {
                type: Date
            },
            student_age_new: {
                type: Number
            },
            student_gender_new: {
                type: String
            },
            student_section_new: {
                type: String
            },
            student_section_name_new: {
                type: String
            },
        },
    },
})

const AuditTrail = model('AuditTrail', AuditTrailSchema)

module.exports = AuditTrail