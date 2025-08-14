const User = require("../models/user.model")
const bcrypt = require('bcrypt');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.config');

const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

// Setup for profile image upload
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user_images', // Folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
    }
});

const uploadProfileIconMiddleware = multer({ storage: storage }).single('image');

//const uploads = multer({ storage: storages });
//const uploadProfileIconMiddleware = uploads.single('image');

// Controller function
const uploadProfileIcon = async (req, res) => {
    try {
        const imageUrl = req.file.path;

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { user_img: imageUrl },
            { new: true, runValidators: true }
        );

        res.json({ status: "ok", users: updateUser,   imageUrl: imageUrl });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


const findAllUser = (req, res) => {
    User.find({}, '-user_password')
        .then((allUser) => {
            res.json({ users: allUser })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findUserByName = (req, res) => {
    User.findOne({ name: req.params.namex })
        .then((theUser) => {
            res.json({ user: theUser })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}


const createUser = async (req, res) => {
    try {
        const { user_password, ...rest } = req.body;


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user_password, salt);


        const newUser = await User.create({
            ...rest,
            user_password: hashedPassword
        });

        res.json({ user: newUser, status: 'Okay' });
    } catch (err) {
        res.json({ message: 'Something went wrong with creating', err });
    }
};

const updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updatedUser) => {
            res.json({ user: updatedUser, status: 'Updated Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const deleteUser = (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            res.json({ useRef: result, status: 'Deleted Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}


module.exports = {
    testconnection,
    deleteUser,
    updateUser,
    findUserByName,
    findAllUser,
    createUser,
    uploadProfileIcon,
    uploadProfileIconMiddleware
};