var express = require('express')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var router = express.Router();
var passport = require('passport');
const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2'
var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }

});

const upload = multer({storage:storage});
var User = require('../model/users')
router.post('/upload', upload.single("image"), function (req, res, next) {
    console.log(req.params.image);
    
    if (!req.image) {
        console.log("No image received");
         res.send({success: false});
    } else {
        console.log('image received');
         res.send(req.image)
    }
})
router.get('/getImage/:name', function (req, res, next) {
    res.sendFile('C:/Users/houni/OneDrive/Bureau/Formation/FBL/uploads/' + req.params.name);
})
router.post('/login', function (req, res, next) {
    var password = req.body.password
    var email = req.body.email 
    if (password == null || email == null) {
        res.send({
            'error': 'missing parametres'
        })
    }
    User.findOne({ email: email }).exec(function (err, userfound) {

        if (userfound) {
            bcrypt.compare(password, userfound.password, function (err, resBycrypt) {
                if (resBycrypt) {

                    const token = jwt.sign({
                        '_id': userfound._id,
                        'email': userfound.email,
                        'nom': userfound.nom,
                        'image' : userfound.image,
                        'prenom': userfound.prenom,
                    },
                        JWT_SIGN_SECRET, {
                            expiresIn: '1h'
                        });
                    res.status(200).send({
                        Message: 'authentification valide',
                        token: token
                    })

                } else {
                    res.status(403).send({
                        'error': 'invalid password'
                    })
                }
            });
        } else {
            res.status(404).send({
                'error': 'user not exist in DB'
            })
        }
    })

});

router.post('/register', function (req, res) {
    User.findOne({
            email: req.body.email
        })
        .then(function (userfound) {
            if (!userfound) {
                bcrypt.hash(req.body.password, 10, function (err, bcryptedPassword) {
                    var newUser = new User({
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        email: req.body.email,
                        image : req.body.image,
                        password: bcryptedPassword,          
                    });

                    newUser.save(function(err, newUser){
                        if(err) {
                            res.send(err)
                        }
                        else{                         
                            res.send({
                                'message': "Candidat ajoutée",
                                '_id': newUser._id
                            })
                        }        
                    })
                })
            }
          else {
                res.send({
                    'error': 'user already exsit'
                })
            }
        })
        .catch(function (err) {
            res.send({
                'error': 'unable to verify user'
            })
        });
})

router.get('/getUser', function (req, res, next) {
    User.find().populate('owner').exec(function (err, users) {
        if (err) {
            res.send(err)
        } else {
            res.send(users)
        }
    })
})
router.get('/getUsers', passport.authenticate('bearer', {
    session: false
}), (req, res, next) => {
    User.find().exec((err, users) => {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
});
router.get('/getUserById/:id', passport.authenticate('bearer', {
    session: false
}), function (req, res, next) {
    User.findById({
        _id: req.params.id
    }).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})
module.exports = router;