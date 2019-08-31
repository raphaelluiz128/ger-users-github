'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Validation = require('../validators/validator');
const md5 = require('md5');
const authService = require('../services/auth');

exports.post = async (req, res, next) => {

    let validate = new Validation();
    validate.isEmail(req.body.login, 'E-mail inválido');
    validate.hasMinLen(req.body.password, 5, 'Senha deve ter no mínimo 6 caracteres');
    validate.isFixedLen(req.body.cpf, 11, 'CPF deve ter 11 números');
    validate.isNumber(req.body.cpf, 'CPF deve ser apenas números');

    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();
        return;
    }
    var user = new User({
        name: req.body.name,
        login: req.body.login,
        cpf: req.body.cpf,
        admin: req.body.admin,
        password: md5(req.body.password + global.SALT_KEY),
        roles: ["common"]
    });
    try {
        await user.save();
        res.status(201).send({ message: 'Usuário cadastrado' });
    } catch (err) {
        res.status(400).send({ message: 'Falha ao cadastrar' });
        console.log(err);
    }
};

exports.authenticate = async (req, res, next) => {

    try {
        const user = await User.findOne({
            login: req.body.login,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!user) {
            res.status(404).send({
                message: 'Usuário ou senha inválida'
            });
            return;
        }

        const token = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name,
                roles: user.roles
            }
        })

    } catch (err) {
        console.log(err);
    }

}

exports.get = async (req, res, next) => {
    try {
        const search = await User.find({});
        res.status(200).send(search);
    } catch (err) {
        res.status(400).send({ message: 'Falha ao buscar' });
        console.log(err);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const search = await User.findById(req.params.id);
        res.status(200).send(search);
    } catch (err) {
        res.status(400).send({ message: 'Falha ao buscar' });
        console.log(err);
    }
}

exports.put = async (req, res, next) => {

    try {
        await User.findByIdAndUpdate(req.query.id, {
            $set: {
                login: req.body.login,
            }
        });
        res.status(200).send({
            message: 'Usuário atualizado.'
        });
    } catch (err) {
        res.status(400).send({
            message: 'Falha ao atualizar.'
        });
        console.log(err);
    };
};

exports.delete = async (req, res, next) => {
    try {
        await User.findOneAndRemove(req.body.id);
        res.status(200).send({
            message: "Usuário removido com sucesso"
        });
    } catch (err) {
        res.status(400).send({
            message: "Falha ao remover.",
            data: e
        });
        console.log(err);
    }
};