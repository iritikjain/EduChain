const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const NGO = require('../models/ngo')
const Users = require('../models/user')
const { sendEmail } = require('../utils/sendEmail')
const { addNgo } = require('../controllers/contractFunction')
require('dotenv').config()

// @desc    Fetch admin Profile Info
// @route   GET /admin/profile
// @access  Public
const adminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId);
        if (!admin) return res.status(400).send({ status: false, message: 'No Admin found' });
        return res.status(200).send({ status: true, message: 'Admin Data', admin });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error Logging In: ${error.message}` });
    }
};

// @desc    Fetch All approved NGO's
// @route   GET /admin/approved-ngos
// @access  Private
const getApprovedNgos = async (req, res) => {
    try {
        const ngoList = await NGO.find({ isApproved: true });
        const formatedNgoList = ngoList.map(ngo => ({
            email: ngo.email,
            name: ngo.name,
            phone: ngo.phone,
            location: ngo.location,
            documentUrl: ngo.documentUrl,
            maxUserCount: ngo.maxUserCount,
            joinedUserCount: ngo.joinedUserCount,
            isApproved: ngo.isApproved
        }));
        return res.status(200).send({ status: true, message: 'Approved NGO Data', ngoList: formatedNgoList });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error Logging In: ${error.message}` });
    }
};

// @desc    Fetch All approved NGO's
// @route   GET /admin/pending-ngos
// @access  Private
const getApprovalPendingNgos = async (req, res) => {
    try {
        const ngoList = await NGO.find({ isApproved: false });
        const formatedNgoList = ngoList.map(ngo => ({
            email: ngo.email,
            name: ngo.name,
            phone: ngo.phone,
            location: ngo.location,
            documentUrl: ngo.documentUrl,
            maxUserCount: ngo.maxUserCount,
            joinedUserCount: ngo.joinedUserCount,
            isApproved: ngo.isApproved
        }));
        return res.status(200).send({ status: true, message: 'Approval Pending NGO Data', ngoList: formatedNgoList });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error Logging In: ${error.message}` });
    }
};

// @desc    Fetch users present on our platform
// @route   GET /admin/users
// @access  Private
const users = async (req, res) => {
    try {
        const users = await Users.find({});
        if (!users) return res.status(400).send({ status: false, message: 'No User Present' });
        return res.status(200).send({ status: true, message: 'Users Data', users });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error Logging In: ${error.message}` });
    }
};


// @desc    Register a new Admin
// @route   POST /admin/register
// @access  Public
const registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the email already exists
        let admin = await Admin.findOne({ email });
        if (admin) return res.status(400).send({ status: false, message: 'Email already exists' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        // Save the new Admin
        await newAdmin.save();

        return res.status(201).send({ status: true, message: 'Admin created successfully' });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error creating Admin ${error.message}` });
    }
};

// @desc    Update a existing Admin
// @route   POST /admin/update
// @access  Private
const updateAdmin = async (req, res) => {
    const { email, nearWallet, password, firstName, lastName, profileImg, adminBio } = req.body;
    try {
        // Find the user
        const { ngoId } = req;
        const adminData = await Admin.findById(ngoId);
        if (!adminData) return res.status(404).send({ status: false, message: 'Admin not found' });

        // Update the user information
        if (email) adminData.email = email;
        if (nearWallet) adminData.nearWallet = nearWallet;
        if (firstName) adminData.firstName = firstName;
        if (lastName) adminData.lastName = lastName;
        if (profileImg) adminData.profileImg = profileImg;
        if (adminBio) adminData.adminBio = adminBio;

        // Hash the password if it was updated
        if (password) {
            const salt = await bcrypt.genSalt(10);
            adminData.password = await bcrypt.hash(password, salt);
        }

        // Save the updates
        await adminData.save();

        return res.status(200).send({ status: true, message: 'Admin Updated Successfully' });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error Updating Admin: ${error.message}` });
    }
};

// @desc    Delete a exisiting Admin
// @route   DELETE /admin/delete
// @access  Private
const deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.ngoId)
        if (!deletedAdmin) return res.status(400).send({ message: 'Error deleting, Admin Not Found' });
        return res.status(200).send({ status: true, message: 'Admin deleted successfully' });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error deleting Admin${error.message} ` });
    }
};

// @desc    Change NGO approval status
// @route   POST /admin/change-status
// @access  Private
const changeNgoStatus = async (req, res) => {
    const { ngoEmail } = req.body;
    try {
        // Find the user
        const ngoData = await NGO.findOne({ email: ngoEmail });
        if (!ngoData) return res.status(404).send({ status: false, message: 'NGO not found' });

        // Update the user information
        if (ngoData.isApproved) {
            ngoData.isApproved = false;
        } else {
            ngoData.isApproved = true;
            const subject = `NGO Approved | EduChain`;
            const message = `
            <h1>Educhain</h1>
            <p>Hello, Your NGO Is Now Approved To Use Educhain. Kindly Login By Clicking On This Link : </p>
            <a href = "http://localhost:3000/login">Login Now</a>
            `;

            // send email
            const mailOptions = {
                from: process.env.EMAIL,
                to: ngoData.email,
                subject,
                html: message,
            };

            await sendEmail(mailOptions);
            await addNgo(
                {
                    ngo_id: ngoData._id,
                    name: ngoData.name,
                    account: ngoData.nearWallet,
                    description: "NGO description"
                }
            )

        }  // Save the updates
        await ngoData.save();
        return res.status(200).send({ status: true, message: 'NGO Updated Successfully' });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error Updating NGO: ${error.message}` });
    }
};

// @desc    Change NGO approval status
// @route   DELETE /admin/delete-ngo
// @access  Private
const deleteNgo = async (req, res) => {
    const { ngoEmail } = req.body;
    try {
        // Find the user
        const ngoData = await NGO.findOneAndDelete({ email: ngoEmail });
        if (!ngoData) return res.status(404).send({ status: false, message: 'NGO not found for Deletion' });

        return res.status(200).send({ status: true, message: 'NGO Deleted Successfully' });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error Updating NGO: ${error.message}` });
    }
};


module.exports = {
    adminProfile,
    registerAdmin,
    updateAdmin,
    getApprovedNgos,
    deleteAdmin,
    getApprovalPendingNgos,
    changeNgoStatus,
    deleteNgo,
    users
}