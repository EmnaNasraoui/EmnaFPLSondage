const router = require('express').Router();
const User = require('./../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    let lvl = 0;
    const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const majus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const min = "abcdefghijklmnopqrstuvwxyz";
    let password = req.body.motDePasse

    if (password.length >= 8 && password.length <= 20) {
        for (let i = 0; i < password.length; i++) {
            const element = password[i];
            if (number.includes(element)) {
                lvl++;
                break;
            }
        }
        for (let i = 0; i < password.length; i++) {
            const element = password[i];
            if (majus.includes(element)) {
                lvl++;
                break;
            }
        }
        for (let i = 0; i < password.length; i++) {
            const element = password[i];
            if (min.includes(element)) {
                lvl++;
                break;
            }
        }
        level = (lvl == 1) ? "easy" : (lvl == 2) ? "Soft" : (lvl == 3) ? "Hard" : "";
        console.log(level)
        req.body.motDePasse = bcrypt.hashSync(req.body.motDePasse, 10);
        const result = await User.create(req.body).catch(err => err)
        res.send(result);
    }

    else {
        level = "Votre mot de passe doit contenir au moins 8 caractères et moins de 20.";
        res.send(level)

    }
})
router.post('/login', async (req, res) => {

    let email = req.body.email;
    let motDePasse = req.body.motDePasse
    console.log(email, motDePasse)
    const result = await User.findOne({ email: email })
    console.log(result);
    if (result && bcrypt.compareSync(motDePasse, result.motDePasse)) {
        const token = jwt.sign({ id: result }, 'user');
        res.send({ lvl: 'Votre connexion est valide', token: token });
    }
    else {
        res.send({ lvl: ' Veuillez vérifier votre email ou votre mot de passe ' });
    };

})

module.exports = router