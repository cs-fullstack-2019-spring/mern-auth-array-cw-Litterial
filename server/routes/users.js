var Book=require('../models/BookSchema');
var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  Book.findById(id, function(err, user) {
    done(err, user);
  });
});
var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
};
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
/* GET users listing. */
router.get('/', function(req, res, next) {
  Book.findOne({username:req.session.username},(err,results)=>{
    res.send(results);
  })
});





// This is the "strategy" for checking for an existing user
passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log("Local Strat");
      Book.findOne({ 'username': username }, function (err, user) {
        if (err) { console.log("1");
          return done(err); }
        if (!user) {
          console.log("2");
          return done(null, false, { message: 'Incorrect username/password.' });
        }
        // if (!user.validPassword(password)) {
        if (!isValidPassword(user, password)) {
          console.log("3");
          return done(null, false, { message: 'Incorrect username/password.' });
        }
        console.log("4");
        console.log(user);
        return done(null, user, { user: user.username });
      });
    }
));

//Strategy to signup a new user
passport.use('signup', new LocalStrategy({
      passReqToCallback : true
    },
    function(req, username, password, done) {
      console.log("0");
      findOrCreateUser = function(){
        // find a user in Mongo with provided username
        Book.findOne({username:username},function(err, user) {
          // In case of any error return
          if (err){
            console.log("1");
            console.log('Error in SignUp: '+err);
            return done(err);
          }
          // already exists
          if (user) {
            console.log("2");
            console.log('User already exists');
            return done(null, false,
                // req.flash('message','User Already Exists')
                { message: 'User already exists.' }
            );
          } else {
            console.log("3");
            // if there is no user with that email
            // create the user
            var newUser = new Book();
            // set the user's local credentials
            newUser.username = req.body.username;
            newUser.password = createHash(req.body.password);
            // newUser.fav_books=req.body.fav_books;

            // save the user
            newUser.save(function(err) {
              if (err){
                console.log("4");
                console.log('Error in Saving user: '+err);
                throw err;
              }
              console.log('User Registration succesful');
              return done(null, newUser);
            });
          }
        });
      };

      // Delay the execution of findOrCreateUser and execute
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    })
);




// This is the route to check for new users
router.post('/login',
    passport.authenticate('local',
        {successRedirect:'/users/loginsuccess',failureRedirect: '/users/loginfail' }),
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.

    function(req, res) {
      console.log("Client's req");
      console.log(req.body); // test code to see if something is in the body
      req.session.username=req.body.username;
      res.send(req.body.username);
    });

// **** I'm not running this right now because I want to use the user data
// If there is a successful check of an existing user
router.get('/loginsuccess', (req, res)=>{
  context={islogged:true, message:"Successful Login"};
  res.send(context)
});

// If there is a failure check of an existing user
router.get('/loginfail', (req, res)=>{
  context={islogged:false, message:"Login Failed"};

  res.send(context)
});


// This is the route to create a new user.
router.post('/newuser',
    passport.authenticate('signup',
        { successRedirect: '/users/successNewUser',
          failureRedirect: '/users/failNewUser'
        }
    ),
    function(req, res) {
      console.log("test");
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.send('Authenticated!');
    });

// If there is a successful new user
router.get('/successNewUser', (req, res)=>{
  res.send("New user created")
});

// If there is a failer of a new user
router.get('/failNewUser', (req, res)=>{
  console.log("Failed to create new User");
});



// ******************************************
// ******   How to protect routes   *********
// ******************************************

/* GET Home Page */
// router.get('/home', isAuthenticated, function(req, res){
//     res.render('home', { user: req.user });
// });
//
// // As with any middleware it is quintessential to call next()
// // if the user is authenticated
// var isAuthenticated = function (req, res, next) {
//     if (req.isAuthenticated())
//         return next();
//     res.redirect('/');
// }


module.exports = router;

module.exports = router;
