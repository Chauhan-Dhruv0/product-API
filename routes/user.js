const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/user");


router.get("/", async (req, res) => {
    try {
        
        const user = await User.find()
            .select("email _id password")
            .exec()
        res.status(201).json({
            Total_User: user.length, user

        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail Exist Try New Email",
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const newuser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                        });
                        newuser.save().then((result) => {

                            res.status(201).json({
                                message: "User Created Successfully",
                            })

                        })
                            .catch((err) => {
                                res.status(500).json({ message: err.message });
                            });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});


router.post('/login', (req, res, next) => {
    // Find the user by email
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length === 0) {
                // No user found
                return res.status(401).json({
                    message: "Authentication failed. User not found."
                });
            }

            // Compare password with hashed password
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Authentication failed. Internal error."
                    });
                }

                if (result) {
                    const token = jwt.sign({
                        email:user[0].email,
                        id:user[0]._id
                    },process.env.JWT_KEY,{
                        expiresIn:"1h"
                    })

                    return res.status(200).json({
                        message: "Authentication successful.",
                        token: token
                    });
                } else {
                    // Password mismatch
                    return res.status(401).json({
                        message: "Authentication failed. Invalid password."
                    });
                }
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: "Internal server error.",
                error: err
            });
        });
});


    router.delete('/:userID', (req, res, next) => {
        User.deleteOne({ _id: req.params.userID })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "Deleted user successfully"
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    })

    module.exports = router;
