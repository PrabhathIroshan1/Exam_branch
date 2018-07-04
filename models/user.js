const mongoose= require ('mongoose');
const schema = mongoose.Schema;
const bcrypt = require ('bcryptjs');

const userSchema = new schema({

     type:{type:String,required:true},
     username:{type:String,required:true},
     name:{type:String,required:true},
     email:{type:String,required:true},
     password:{type:String,required:true},
     conNo:{type:String,required:true},
     courses:{type:{}},
});

const User = module.exports = mongoose.model('User',userSchema);


module.exports.saveUser = function (newUser,callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;

            if (err) throw err;
            newUser.save(callback);
            // Store hash in your password DB.
        });
    });   
   
};

// module.exports.updateUser = function (id, user, callback) {
//     User.findOneAndUpdate(
//         {_id: id},
//         {
//             $set: {
//                 name: user.name,
//                 email: user.email,
//             }
//         }, callback
//     );
// };

module.exports.addExam = function (id, exam, callback) {
    User.findOneAndUpdate(
        {_id: id},
        {
            $set: {
                courses: exam.courses,
            }
        }, callback
    );
};


module.exports.findByEmail=function (email,callback) {
  const query = {email:email};
  User.findOne(query,callback);  
};

module.exports.getAllstudents = function(callback){
    User.find({},callback);
};


module.exports.passwordCheck =function (plainPassword,hash,callback) {
    // Load hash from your password DB.
    bcrypt.compare(plainPassword, hash, function(err, res) {
    // res === true
    if(err) throw err;
    
    if (res) {
        callback(null,res);
    
    } else{
        callback(null,false)
    }
});

}

module.exports.findUserById = function (id,callback) {
    User.findOne(id,callback);
    
};