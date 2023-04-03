const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Publisherschema = new Schema({
    name:{
        type:String,
    },
    yearFounded:{
        type:String
    }
})

const Publishermodel = mongoose.model('Publisher',Publisherschema);
module.exports = Publishermodel