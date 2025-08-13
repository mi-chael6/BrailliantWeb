const Section = require("../models/section.model")
const mongoose = require('mongoose');

const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findAllSection = (req, res) => {
    Section.find()
        .then((allSection) => {
            res.json({ sections: allSection })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findSectionByName = (req, res) => {
    Section.findOne({ _id: req.params.namex })
        .then((theSection) => {
            res.json({ section: theSection })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findSectionByTeacher = (req, res) => {
    Section.find({ section_instructor: req.params.namex })
        .then((theSection) => {
            res.json({ sections: theSection })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}



const findSectionById = (req, res) => {
    Section.findById(req.params.id)
        .then((theSection) => {
            res.json({ section: theSection });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err });
        });
};

const createSection = (req, res) => {
    const sectionData = {
        ...req.body,
        section_instructor: new mongoose.Types.ObjectId(req.body.section_instructor)
    };

    Section.create(sectionData)
        .then((newSection) => {
            res.json({ section: newSection, status: 'Okay' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const updateSection = (req, res) => {
    Section.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updatedSection) => {
            res.json({ section: updatedSection, status: 'Updated Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const deleteSection = (req, res) => {
    Section.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.params.id) })
        .then((result) => {
            res.json({ useRef: result, status: 'Deleted Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with deleting section', err })
        })
}

const getSectionCount = async (req, res) => {
    try {
        const count = await Section.countDocuments();
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { findAllSection, testconnection, createSection, updateSection, deleteSection, findSectionByName, getSectionCount, findSectionById, findSectionByTeacher }