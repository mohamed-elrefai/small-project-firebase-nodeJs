const router = require('express').Router(),
      FirebaseAdmin = require('../firebase'),
      JWT = require('jsonwebtoken');

// Firebase Connect
const firebase_auth = FirebaseAdmin.auth();
const firebase_firestore = FirebaseAdmin.firestore();

// Get Register & Login Page;
router.get('/register', (req, res) => res.render('register'))
router.get('/login', (req, res) => res.render('login'))

// Create Cookie with JWT
const maxAge = 3 * 24 * 60 * 60;
const cookieUserId = (id)=>{
    return JWT.sign({id}, "net mohamed", {expiresIn: maxAge})
}

// Post Register & Login Data

// Register
router.post('/register', (req, res)=>{
    const {username, email, password, password2, phone_number, service}= req.body;

    // Handel Error
    const error = [];

    // Check if user don't insert data
    if(!username || !email || !password || !password2 || !phone_number || !service) return error.push({msg: "please insert data"});

    //Check Confirm Password
    if(password != password2) return error.push({msg: "please input correct password"});

    // Check Password Length
    if(password.length <= 6) return error.push({msg: "please input password number or character min = 6"});

    // Check Error length
    if(error.length > 0){
        res.render('register', {
            error,
            username, 
            email, 
            password, 
            password2, 
            phone_number, 
            service
        })
    }else{
            firebase_auth.createUser({email, password})
                .then(cred =>{
                    firebase_firestore.collection('Hall_user').doc(cred.uid).set({
                        username: username, 
                        email: email, 
                        password: password, 
                        phone_number: phone_number, 
                        service: service
                    });
                    const token = cookieUserId(cred.uid);
                    res.cookie('LX', token, {httpOnly: true, secure:true, expiresIn: maxAge * 1000});
                    res.render('profile', ({ProUser: cred.uid}))
                }).catch(err => {
                    const errCode = err.code;
                    const errMsg = error.message;
    
                    error.push({errCode});
                    res.render('register', {
                        error,
                        username, 
                        email, 
                        password, 
                        password2, 
                        phone_number, 
                        service
                    })
                })
    }
    
})


module.exports = router;