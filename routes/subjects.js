const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');
const config = require('../config/database');



router.post("/subject", function (req, res) {
    //console.log(req.body);

    const newSubject = new Subject({
        subject_name:req.body.subject_name,
        subject_code:req.body.subject_code,
        student_type:req.body.student_type,
        student_year:req.body.student_year,
        semester:req.body.semester,
        date:req.body.date,
        time:req.body.time
    });

    Subject.saveSubject(newSubject, function (err, subject) {
        if (err) {
            res.json({ state: false, msg: "data not inserted" });
        }

        if (subject) {
            res.json({ state: true, msg: "data inserted" });

        }
    })
});


router.get('/getSubject', (req, res) => {
    Subject.getAllsubjects((err, subjects) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to make get request' });
        } else {
            res.send({subjects:subjects});
         
        }
    });
})

module.exports = router;