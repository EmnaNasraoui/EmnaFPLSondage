let mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
    vote : {

        type: String,

        enum: ['oui', 'non']
    },
    auteur : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    sujet : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Sujet'
    }

})
 

module.exports = mongoose.model('Vote', VoteSchema);