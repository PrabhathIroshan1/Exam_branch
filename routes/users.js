const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');




router.post("/register", function (req, res) {
    // console.log(req.body);

    const newUser = new User({
        type: req.body.type,
        // student_year: req.body.student_year,
        // semester: req.body.semester,
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        conNo:req.body.conNo

    });

    User.saveUser(newUser, function (err, user) {
        if (err) {
            res.json({ state: false, msg: "data not inserted" });
        }

        if (user) {
            res.json({ state: true, msg: "data inserted" });

        }
    })
});



router.post("/login", function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    
    User.findByEmail(email, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ state: false, msg: "no user found" });
            return false;
        }

        User.passwordCheck(password, user.password, function (err, match) {
            if (err) throw err;

            if (match) {
                // console.log("true");
                const paylode = ({ _id: user.id, name: user.name })
                const token = jwt.sign(paylode, config.secret, { expiresIn: 86400 });
                res.json({
                    state: true,
                    token: 'bearer' + token,
                    user: {
                        type:user.type,
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                res.json({ state: false, msg: "Password does not match. Check the Password" });
            }
        });
    })
});

router.post('/profile', passport.authenticate('jwt', { session: false }),
    function (req, res) {
        res.json({ user: req.user });
    }
);


router.get('/getStudent', (req, res) => {
    User.getAllstudents((err, students) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to make get request' });
        } else {
            res.send({students:students});
         
        }
    });
});


// router.put('/update/:id', function (req, res, next) {
//     let user = new User({
//         name: req.body.name,
//         email: req.body.email
//     });
//     User.updateUser(req.params.id, user, function (err, user) {
//         if (err) return res.json({success: false, msg: 'Failed to update user'});
//         else return res.json({success: true, msg: 'Updated info', user: user});
//     });
// });


router.put('/update/exam/:id', function (req, res, next) {
    let exam = {
        courses: req.body.courses,
    };
    User.addExam(req.params.id, exam, function (err, user) {
        if (err) return res.json({success: false, msg: 'Failed to update exams'});
        else return res.json({success: true, msg: 'Updated exam info', user: user});
    });
});



module.exports = router;