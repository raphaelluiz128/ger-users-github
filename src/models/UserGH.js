const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

name:{
    type: String,
    required: true
},
login:{
    type: String,
    required: true,
},
bio:{
    type: String,
    required: false,  
},
location:{
    type: String,
    required: true,
},
html_url:{
    type: String,
    required: true,
},
tags:[{
    type: String, 
}]

});

module.exports = mongoose.model('UserGH', schema);