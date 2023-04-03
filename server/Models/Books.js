const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bookschema = new Schema({
    name:{
        type:String,
      
    },
    genre:{
        type:String,
    },
    authorId:{
        type:String,
    },
    publisher:{
        type:String
    }
})

const Bookmodel = mongoose.model('Book',Bookschema);
module.exports = Bookmodel