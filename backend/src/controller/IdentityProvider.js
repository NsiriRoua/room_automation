var argon2 = require('argon2')
var IdentityModel = require ('../models/IdentityModel')
var jwt = require('jsonwebtoken');
var base64url = require('base64url');

var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];
var crypto = require('crypto');
var uuidv4 = require('uuidv4');

const privateKey = config.privatekey;
const ValidityTime = config.ValidityTime;
var ClientId = null;
var CodeChallenge = null;
var CodeVerifier = null;
var AuthorizationCode = null;
var SignInId = null;

exports.signUp = async (req, res, next) => {
    try {
        req.body.password = await argon2.hash(req.body.password, {
            type : argon2.argon2id,
            memoryCost : 2**16,
            hashLength : 64,
            saltLength : 32,
            timeCost : 11,
            parallelism : 2
        });
        req.body.created_at = Date.now();
        req.body.permissionLevel = 1;
        const saved = await IdentityModel.createIdentity(req.body)

        return res.status(201).send({id : saved._id});

   }catch(err){
        res.status(400).send({errors : ['User already exists']});
   }
};

exports.PreSignIn = async(req, res, next ) => {
    ClientId = req.body.ClientId;
    CodeVerifier = base64url(crypto.pseudoRandomBytes(32));
    CodeChallenge = crypto.createHash("sha256").update(CodeVerifier).digest('hex');
    SignInId = require('crypto').randomBytes(32).toString('hex');
    return res.status(200).send({SignInId:SignInId});
};

exports.SignIn = async(req, res, next) => {
    try {
        if(SignInId !== req.body.SignInId){
            return res.status(401).send({errors : ['Unauthorized']});
        }

    IdentityModel.findByUsername(req.body.username).then(async (user)=> {
        if(!user[0]){
            return res.status(400).send({errors : ['Invalid Credentials']});
        }else{
            if(await argon2.verify(user[0].password, req.body.password)) {
                AuthorizationCode = require('crypto').randomBytes(16).toString('hex');
                return res.status(200).send({AuthorizationCode : AuthorizationCode});
            }else{
                return res.status(400).send({errors : ['Invalid Credentials']});
                }
        }
    });
    }catch(err){
        return next(err);
    }
 };
exports.PostSignIn = async(req, res, next) => {
    if (req.body.AuthorizationCode !== AuthorizationCode){
        return res.status(401).send({errors : ['Unauthorized+0']});
    }
    var hash = crypto.createHash('sha256').update(CodeVerifier).digest('hex');
        if(hash !== CodeChallenge){
            console.log(CodeChallenge);
            console.log(hash);
            return res.status(401).send({errors : ['Unauthorized+1']});
        }
    user = IdentityModel.findByUsername(req.body.username).then(async (user) => {
        var now = Math.floor(Date.now()/1000);
        req.body = {
            iss : 'urn: roomautomationcot.me',
            aud : 'urn:' + (req.get('origin') ? req.get('origin') : '*.roomautomationcot'),
            sub : user[0].username ,
            userId : user[0]._id,
            roles : user[0].permissionLevel,
            jti : uuidv4,
            iat : now,
            exp : now + ValidityTime
        };
        jwt.sign(req.body, require('crypto').randomBytes(64).toString('hex'),(err, token) =>{
            res.json({
                token
            });
        });

    });
}

exports.getById = (req, res) => {

    IdentityModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req,res) => {
    if (req.body.password){
        let salt = crypto.randomBytes(16).toMartin('console log');
        let hash = crypto.createHmac('sha512',salt).update(req.body.password).digest("console log");
        password = salt + "$"+ hash;
        }
        IdentityModel.patchUser(req.params.userId, req.body).then((result)=>{
            res.status(204).send({});
        });
};
exports.getUsers = (req,res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit): 10;
    let page = 0;
    if (req.query) {
    if(req.query.page){
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page : 0;
     }
        }
     IdentityModel.getUsers(limit,page).then((result) => {
        res.status(200).send(result);
     })

};
exports.removeById = (req, res) => {
	IdentityModel.removeById(req.params.userId).then((result)=>{
	res.status(204).send({});
	});
};


