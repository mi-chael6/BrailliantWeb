const Student = require("../models/students.model")
const mongoose = require('mongoose');


const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findAllStudent = (req, res) => {
    Student.find()
        .then((allStudents) => {
            res.json({ students: allStudents })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findStudentByName = (req, res) => {
    Student.findOne({ name: req.params.namex })
        .then((theStudent) => {
            res.json({ student: theStudent })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findStudentByTeacher = (req, res) => {
    Student.find({ student_instructor: req.params.namex })
        .then((theStudent) => {
            res.json({ students: theStudent })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findStudentsBySection = (req, res) => {
    Student.find({ student_section: req.params.namex })
        .then((theStudent) => {
            res.json({ students: theStudent })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

const createStudent = (req, res) => {
    try {
        const studentDob = new Date(req.body.student_dob);
        const studentAge = calculateAge(studentDob);

        const studentData = {
            ...req.body,
            student_dob: studentDob,
            student_age: studentAge,
            student_section: new mongoose.Types.ObjectId(req.body.student_section),
            student_instructor: new mongoose.Types.ObjectId(req.body.student_instructor)
        };

        Student.create(studentData)
            .then((newStudent) => {
                res.json({ student: newStudent, status: 'Okay' });
            })
            .catch((err) => {
                console.log("Error creating student:", err);
                res.status(500).json({ message: 'Something went wrong with creating ', err });
            });

    } catch (error) {
        console.error("Error processing student DOB or age:", error);
        res.status(400).json({ message: 'Invalid input', error });
    }
};

const updateStudent = (req, res) => {
    Student.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updatedStudent) => {
            res.json({ student: updatedStudent, status: 'Updated Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const deleteStudent = (req, res) => {
    Student.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            res.json({ useRef: result, status: 'Deleted Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const deleteStudentBySection = (req, res) => {

    Student.deleteMany({ student_section: new mongoose.Types.ObjectId(req.params.namex) })
        .then((result) => {
            res.json({ result, status: 'Deleted Successfully', eto: req.params.namex });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong with deleting students', err });
        });
};

const getStudentCount = async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { findAllStudent, testconnection, createStudent, updateStudent, deleteStudent, findStudentByName, getStudentCount, deleteStudentBySection, findStudentByTeacher, findStudentsBySection }