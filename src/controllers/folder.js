'use strict';

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Folder = mongoose.model('Folder');

exports.post = async (req, res, next) => {
    var folder = new Folder(req.body);
    try {
        await folder.save();
        res.status(201).send({ message: 'Pasta cadastrada' });
    } catch (err) {
        res.status(400).send({ message: 'Falha ao cadastrar' });
        console.log(err);
    }
};

exports.put = async (req, res, next) => {
    try {
        await Folder.findByIdAndUpdate(req.query.id, {
            $set: {
                name: req.body.name,
            }
        });
        res.status(200).send({
            message: 'Nome da lista atualizado.'
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: 'Falha ao atualizar.',
            data: e
        });
    }
};

exports.putAddUser = async (req, res, next) => {
    try {
        console.log(req.query.id);
        await Folder.findByIdAndUpdate(req.query.id, {
            $push: {
                users: req.body.id,
            }
        });
        res.status(200).send({
            message: 'Usuário adicionado na pasta.'
        });
    } catch (err) {
        res.status(400).send({
            message: 'Falha ao adicionar na pasta.',
        });
        console.log(err);
    }
};


exports.delete = async (req, res, next) => {
    try {
        await Folder.findOneAndRemove(req.body.id);
        res.status(200).send({
            message: "Lista removida com sucesso"
        });
    } catch (err) {
        res.status(400).send({
            message: "Falha ao remover.",
        })
        console.log(err);
    }
};


exports.get = async (req, res, next) => {

    try {
        const search = await Folder.find({});
        res.status(200).send(search);
    } catch (err) {
        res.status(400).send({ message: 'Falha ao buscar' });
        console.log(err);
    }
}

