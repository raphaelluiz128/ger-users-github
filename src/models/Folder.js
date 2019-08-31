const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({

name:{
    type: String,
    required: [true,'Name is required']
},
createDate:{
 type: Date,
 required: true,
 default: Date.now
},
users:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:  'UserGH'
}]

});

module.exports = mongoose.model('Folder', schema);