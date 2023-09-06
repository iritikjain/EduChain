require('dotenv').config()
const NgoModel = require("../models/ngo")
const UserModel = require("../models/user")
const jwt = require('jsonwebtoken')
const v4 = require("uuid").v4
const bcrypt = require('bcryptjs')
const { sendEmail } = require('../utils/sendEmail')
const crypto = require('crypto')

// @desc    Register a new NGO
// @route   POST /ngo/register
// @access  Public
const registerNgo = async (req, res) => {
    try {
        const { email, password, name, phone, location, documentUrl } = req.body

        let ngo = await NgoModel.findOne({ email });
        if (ngo) return res.status(400).send({ status: false, message: 'NGO already exists for given Email' });

        // Create the NGO
        const newNgo = new NgoModel({
            email,
            name,
            phone,
            location,
            ngo_user_id: [],
            courseEnrolled: [],
            joinedUserCount: 0,
            maxUserCount: 50,
            documentUrl,
            verificationToken: crypto.randomBytes(64).toString('hex'),
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        newNgo.password = await bcrypt.hash(password, salt);

        await newNgo.save();
        const subject = `EduChain - Verify Your Account`;
        const message = `
        <h1>EduChain</h1>
        <p>Hello, Thanks For Registering On Our Website.</p>
        <p>Kindly Verify Your Email ID By Clicking On This Link : </p>
        <a href = "http://localhost:3000?ngotoken=${newNgo.verificationToken}">Verify Your Account</a>
        `;

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject,
            html: message,
        };
        await sendEmail(mailOptions)

        return res.status(201).send({ status: true, message: 'NGO created successfully' });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error creating NGO ${error}` });
    }
};

// @desc    Verify the NGO  
// @route   POST /ngo/verify
// @access  Public
const verifyNgo = async (req, res) => {
    try {
        const ngo = await NgoModel.findOne({ verificationToken: req.body.token });
        if (!ngo) return res.status(400).send({ status: false, message: 'Invalid Token' });
        ngo.verificationToken = null;
        ngo.isVerified = true;
        await ngo.save();
        return res.status(200).send({ status: true, message: 'Ngo Verified' });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error Verifying Ngo: ${error.message}` });
    }
};

// @desc    Get NGO details
// @route   GET /ngo/
// @access  Private
const getNgoDetail = async (req, res) => {
    try {
        const ngo = await NgoModel.findById(req.ngoId)
        res.status(200).send({ status: true, ngo });
    } catch (error) {
        res.status(400).send({ status: false, message: `Error getting NGO detail ${error}` });
    }
}

// @desc    Get NGOs details
// @route   GET /ngo/all
// @access  Private
const getNgoDetails = async (req, res) => {
    try {
        const ngo = await NgoModel.find({})
        return res.status(200).json(ngo)
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error getting NGOs detail ${error}` });
    }
}

// @desc    Generate Token for NGO student registration 
// @route   POST /ngo/generate-token
// @access  Private
const generateToken = async (req, res) => {
    try {
        const { ngoId } = req;
        const uuidToken = v4();
        const ngo = await NgoModel.findById(ngoId)
        if (!ngo) {
            return res.status(400).json({ status: false, "message": "NGO does not exist" })
        }

        if (ngo.secretCode) {
            console.log("ngo.secretCode", ngo.secretCode)
            return res.status(400).json({ status: false, "message": "Token Already Exist" })
        }
        if (0 > ngo.maxUserCount > 50) {
            return res.status(400).json({ status: false, "message": "maxUserCount should be greater than 0 and less than 50" })
        }
        const query = { _id: ngoId };
        const update = {
            $set: {
                secretCode: uuidToken,
                maxUserCount: req.body.maxUserCount
            }
        }
        await NgoModel.findOneAndUpdate(query, update)

        res.status(200).json({ status: true, "message": `Secret code generated `, "code": uuidToken })
    } catch (error) {
        res.status(400).send({ status: false, message: `Error getting NGO detail ${error.message}` });
    }
}

// @desc    Register a new NGO user
// @route   POST /ngo/register-user
// @access  Public
const registerNgoUser = async (req, res) => {
    try {
        const { email, secretCode, password } = req.body;

        let user = await UserModel.findOne({ email });
        if (user) return res.status(400).send({ status: false, message: 'User already exists for given Email' });

        if (!secretCode) return res.status(400).send({ status: false, message: 'Enter the Secret code to join as NGO associate User' });

        const ngo = await NgoModel.findOne({ secretCode })
        if (!ngo) return res.status(400).send({ status: false, message: "No NGO found" });
        if (ngo.maxUserCount <= ngo.joinedUserCount) return res.status(400).send({ status: false, message: 'The Code has reached its Limit, Please Contact NGO admin' });

        const createNgoUser = new UserModel({
            email,
            ngo: ngo.name,
            verificationToken: crypto.randomBytes(64).toString('hex'),
        });


        // Hash the password
        const salt = await bcrypt.genSalt(10);
        createNgoUser.password = await bcrypt.hash(password, salt);

        await createNgoUser.save();
        const subject = `EduChain - Verify Your Account`;
        const message = `
        <h1>EduChain</h1>
        <p>Hello, Thanks For Registering On Our Website.</p>
        <p>Kindly Verify Your Email ID By Clicking On This Link : </p>
        <a href = "http://localhost:3000?token=${createNgoUser.verificationToken}">Verify Your Account</a>
        `;

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject,
            html: message,
        };
        await sendEmail(mailOptions)
        await NgoModel.findByIdAndUpdate(ngo._id, { $inc: { joinedUserCount: 1 }, $push: { ngoUsersId: createNgoUser._id } })

        res.status(201).send({ status: true, message: 'User created successfully' });
    } catch (error) {
        res.status(400).send({ status: false, message: `Error creating User ${error}` });
    }
};

// @desc    Get All user for respective NGO
// @route   GET /ngo/users
// @access  Private
const getNgoUsers = async (req, res) => {
    try {
        const { ngoId } = req;
        console.log("req", ngoId)
        const ngoUsers = await NgoModel.findById(ngoId).populate("ngoUsersId")
        res.status(200).send({ status: true, ngoUsers })
    } catch (error) {
        res.status(400).send({ status: false, message: `Error getting NGO Users ${error}` });
    }
}

// @desc    Update a existing NGO
// @route   POST /user/update
// @access  Private
const updateNgo = async (req, res) => {
    const { email, name, phone, location, nearWallet } = req.body
    // const { email, nearWallet, password, firstName, lastName, organization, ngo, areaOfInterests, qualification, profileImg, userBio } = req.body;
    try {
        // Find the user
        const { ngoId } = req;
        const ngoData = await NgoModel.findById(ngoId);
        if (!ngoData) return res.status(404).send({ status: false, message: 'Ngo not found' });

        // Update the user information
        if (email) ngoData.email = email;
        if (nearWallet) ngoData.nearWallet = nearWallet;
        if (name) ngoData.name = name;
        if (phone) ngoData.phone = phone;
        if (location) ngoData.location = location;

    
        await ngoData.save();

        return res.status(200).send({ status: true, message: 'Ngo Updated Successfully' });
    } catch (error) {
        return res.status(400).send({ status: false, message: `Error Updating Ngo: ${error.message}` });
    }
};

module.exports = { getNgoDetail, getNgoDetails,updateNgo, generateToken, registerNgo, registerNgoUser, getNgoUsers, verifyNgo }