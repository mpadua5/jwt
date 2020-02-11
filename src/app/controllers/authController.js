const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helper/genate-token.helper");
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

module.exports = {

    register : async function (req, res) {
        console.log("Process ** /register")
        const { email } = req.body;
        try {
            
            if (await User.findOne({ email }))
                return res.status(400).send({ error: "User already exists" });
            
            req.body.password = await bcrypt.hash(req.body.password, 10);
            
            const user = await User.create(req.body);

            console.log(user);
            user.password = undefined;

            return res.send({ 
                user,
                token : generateToken({ id : user.id })
            });
        } catch (err) {
            console.log(err.message);
            return res.status(400).send({ error: 'Registration failed' });
        }
    },

    autenticate : async function (req, res) {
        console.log("Process ** /autenticate");
        
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        
        if (!user)
            return res.status(400).send({ error: "User not found" });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: "Invalid password" });
            
        user.password = undefined;
        
        res.send({ 
            user, 
            token : generateToken({ id: user.id })
        });
    },

    forgot_password: async (req, res) => {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user)
                return res.status(400).send({ error: 'User not found' });

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.updateOne({ _id: user.id }, {
                passwordResetToken: token,
                passwordResetExpires: now
            });

            mailer.sendMail({
                to: email,
                from: 'mauriciourbinati@gmail.com',
                template: 'auth/forgot_password',
                context: { token }
            }, (err) => {
                if (err)
                    return res.status(400).send({ error: 'Cannot send forgot password email'});

                return res.send();
            });
        } catch (err) {
            console.log(err.message);
            res.status(400).send({ error: "Error on forgot password, try again." });
        }        
    },

    reset_password: async (req, res) => {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ email })
                .select('+passwordResetToken passwordResetExpires');
            
            if (!user)
                return res.status(400).send({ error: 'User not found.'});

            if (token !== user.passwordResetToken)
                return res.status(400).send({ error: 'Token invalid.'});

            const now = new Date();
            if (now > user.passwordResetExpires)
                return res.status(400).send({ error: 'Token expired, generate a new one.'});

            user.password = await bcrypt.hash(password, 10);

            await user.save();

            return res.send();

        } catch (err) {
            return res.status(400).send({ error: 'Cannot rese password, try again.'});
        }
    }

}
