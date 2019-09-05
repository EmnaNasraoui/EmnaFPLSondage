let mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({

    nom: {

        type: String
    },

    prenom: {

        type: String
    },


    email: {

        type: String,
        unique: true
    },

    motDePasse: {

        type: String
    },
    numbreDeVote: {

        type: Number,
        default: 0,
    },

})

UserSchema.pre('save', function () {
    console.log(this.motDePasse);
    this.motDePasse = bcrypt.hashSync(this.motDePasse);
    console.log(this.motDePasse);
});
UserSchema.path('email').validate((val) => {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val);
}, 'SVP verifiez votre email.');



module.exports = mongoose.model('User', UserSchema);