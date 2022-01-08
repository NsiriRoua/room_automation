var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: {
        type: String, required: true,  unique: true},
    email : {
        type:String, required: true},
    password: {
        type:String, required: true},
    permissionLevel: Number,
    created_at:{type:Date, default:Date.Now},
    updated_at:{type:Date, default:Date.Now}
    });
const User  = mongoose.model('IdentityModel', userSchema);

exports.createIdentity = (userData) => {
	const user = new User(userData);
	return user.save();
           };
exports.findById = (id) => {
    return User.findById(id).then((result) => {
    result = result.toJSON();
    delete result.__id;
    delete result.__v;
    return result
    });
};

exports.findByUsername = (username)=> {
    return User.find({username : username});
};
exports.patchUser = (id, userData) => {
	return User.findOneAndUpdate({
		_id: id
	}, userData);
};
exports.removeById = (userId) => {
	return new Promise((resolve, reject) => {
		User.deleteMany({_id: userId}, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(err);
            }
		});
	});
};
exports.getUsers = (perPage, page) => {
	return new Promise((resolve, reject) => {
		User.find().limit(perPage).skip(perPage * page).exec(function (err, users) {
			if (err) {
				reject(err);
			} else {
			resolve(users);
			}
       	})
	});
};



