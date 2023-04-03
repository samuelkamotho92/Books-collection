const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Authorschema = new Schema({
    name:{
        type:String,
      
    },
    age:{
        type:Number,
    }
})

const Authormodel = mongoose.model('Author',Authorschema);
module.exports = Authormodel