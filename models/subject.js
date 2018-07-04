const mongoose= require ('mongoose');
const schema = mongoose.Schema;


const subjectSchema = new schema({

    subject_name:{type:String,required:true},
    subject_code:{type:String,required:true},
    student_type:{type:String,required:true},
    student_year:{type:String,required:true},
    semester:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
});

const Subject = module.exports = mongoose.model('Subject',subjectSchema);


module.exports.saveSubject = function (newSubject,callback) {
    newSubject.save(callback);
};


module.exports.getAllsubjects = function(callback){
    Subject.find({},callback);
};
