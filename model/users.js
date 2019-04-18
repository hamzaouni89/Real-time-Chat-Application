var mongoose = require('mongoose')
var valid = require('validator')


var usersSchema = new mongoose.Schema({

    nom:  String,
    prenom: String,
    email: {
        type: String,
        Required: true, trim: true, minlength: 1, unique: true,
    
        validate: {
          validator: valid.isEmail,
          message: '{VALUE} is not a valid email'
        }
      }, 
      password: { type: String, Required: true, minlength: 8 },  
})
module.exports = mongoose.model('Users', usersSchema)