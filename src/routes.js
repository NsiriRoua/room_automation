var express        = require('express'),
    routes         = express.Router();
var IdentityProvider = require('./controller/IdentityProvider')
var passport       = require('passport');
var userController = require('./controller/userController')

var signUp =require('./controller/IdentityProvider')

routes.get('/', (req,res) => {
    return res.send('Hello, this is the API!');
    });
routes.get('/users/:userId', IdentityProvider.getById);
//routes.post('/register', IdentityProvider.signUp);
//routes.post('/login',IdentityProvider.SignIn);
routes.get('/users', IdentityProvider.getUsers)
routes.patch('/users/:userId', IdentityProvider.patchById);
routes.delete('/users/:userId', IdentityProvider.removeById);
routes.post('/authorize', IdentityProvider.PreSignIn);
routes.post('/oauth/token', IdentityProvider.PostSignIn);












routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
//A JWT protected route that only users with a valid token can access
routes.get('/special', passport.authenticate('jwt', {session: false}), (req,res) => {
   return res.json({msg: `Hey ${req.user.email}! I open at the close.`  });
});
module.exports = routes;
