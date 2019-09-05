let mongoose = require('mongoose');

var SujetSchema = new mongoose.Schema({

    titre: {

        type: String
    },

    description: {

        type: String
    },

    vote: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Vote'
    }],
    auteur: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    addedDate: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Sujet', SujetSchema);