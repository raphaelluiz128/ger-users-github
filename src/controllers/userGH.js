'use strict';

const mongoose = require('mongoose');
const UserGH = mongoose.model('UserGH');
const fetch = require("node-fetch");
const Validation = require('../validators/validator');

let IE_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko';

exports.getGH = async (req, res, next) => {
    var data = '';

    const request = await fetch('https://api.github.com/users/' + req.body.username,
        {
            method: 'GET',
            headers: { 'user-agent': IE_USER_AGENT }
        }).then(res => res.json()).then(
            json => data = json);
    console.log(data);

    var user = new UserGH({
        name: data.name,
        login: data.login,
        location: data.location,
        bio: data.bio,
        html_url: data.html_url
    });
    try {
        await user.save();
        res.status(201).send({ message: 'Usuário cadastrado' });
    } catch (err) {
        res.status(400).send({ message: 'Falha ao cadastrar', });
        console.log(err.message);
    }
};

exports.get = async (req, res, next) => {
    const search = await UserGH.find({});
    try {
        res.status(200).send(search);
    } catch (err) {
        res.status(400).send({
            message: 'Falha ao buscar',
        });
        console.log(err);
    };
}

exports.getByTags = async (req, res, next) => {
    const search = await UserGH.find({
        tags: req.body.tags
    });
    try {
        res.status(200).send(search);
    } catch (err) {
        res.status(400).send({
            message: 'Falha ao buscar',
        });
        console.log(err);
    };
}


exports.putTags = async (req, res, next) => {

    let validate = new Validation();
    validate.hasMinLen(req.body.tag, 2, 'Tag deve ter no mínimo 3 caracteres');
    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();
        return;
    }
    try {
        await UserGH.findByIdAndUpdate(req.query.id, {
            $push: {
                tags: req.body.tag,
            }
        });
        res.status(200).send({
            message: 'Tag adicionada.'
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: 'Falha ao adicionar tag.',
        });
    }
};