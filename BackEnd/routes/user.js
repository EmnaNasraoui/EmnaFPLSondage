const router = require('express').Router();
const Vote = require('./../models/vote');
const User = require('./../models/user');
const Sujet = require('./../models/sujet');
let Mongoose = require('mongoose');
let ObjectId = Mongoose.Types.ObjectId;


router.post('/creerUnSujet/:id_auteur', async (req, res) => {
    req.body.auteur = req.params.id_auteur;
    const result = await Sujet.create(req.body).catch(err => err)
    res.send(result)
})
router.post('/ajouterUnVote/:id_auteur/:id_sujet', async (req, res) => {
    req.body.auteur = req.params.id_auteur;
    req.body.sujet = req.params.id_sujet;
    const result = await Vote.create(req.body).catch(err => err)
    const result2 = await Sujet.findByIdAndUpdate(req.params.id_sujet, { $push: { vote: result._id } })
    const result4 = await User.findOne(ObjectId(req.params.id_auteur)).catch(err => err)
    if (result4.numbreDeVote == 0) {
        const result3 = await User.findByIdAndUpdate(req.params.id_auteur, { $set: { numbreDeVote: + 1 } })
        console.log(result3);
    }
    else {
        const result3 = await User.findByIdAndUpdate(req.params.id_auteur, { $set: { numbreDeVote: result4.numbreDeVote + 1 } })
        console.log(result3);
    }
    res.send({ result, result2, result4 })
})
router.get('/tousLesSujets', async (req, res) => {
    const result = await Sujet.find().populate({ path: 'vote', model: 'Vote' }).catch(err => err);
    res.send(result);
})

router.get('/tousVotes', async (req, res) => {
    const result = await Vote.find().catch(err => err);
    res.send(result);
})
router.get('/tousVotesOui/:id_sujet', async (req, res) => {
    const result = await Vote.find({ sujet: ObjectId(req.params.id_sujet) , vote: 'oui' }).catch(err => err);
    res.send(result);
})
router.get('/tousVotesNon/:id_sujet', async (req, res) => {
    const result = await Vote.find({ sujet: ObjectId(req.params.id_sujet) , vote: 'non' }).catch(err => err);
    res.send(result);
})

router.get('/compteurDeVote/:id_user', async (req, res) => {
    const result = await User.findByIdAndUpdate(req.params.id_user, { $set: { numbreDeVote: 0 } })
    res.send(result);
})

router.get('/sujet/:id_sujet', async (req, res) => {
    const result = await Sujet.findOne(ObjectId(req.params.id_sujet)).populate([{ path: 'auteur', model: 'User' }, { path: 'vote', model: 'Vote', populate: { path: 'auteur', model: 'User' } }]).catch(err => err);
    res.send(result);
})
router.get('/user/:id_user', async (req, res) => {
    const result = await User.findOne(ObjectId(req.params.id_user)).catch(err => err);
    res.send(result);
})

module.exports = router