const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({

    login: {
        type: String,
        required: [true, 'login is required']
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    cpf: {
        type: Number,
        required: [true, 'cpf is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    roles: [{
        type: String,
        required: [true, 'valor admin ou valor common é necessário '],
        enum: ['common', 'admin'],
    }],

});

module.exports = mongoose.model('User', schema);