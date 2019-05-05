var  mongoose  = require("mongoose");
const  conversationSchema  =  new mongoose.Schema({


    user1 : { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    user2 : { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    messages : [{ 
        from : {type: mongoose.SchemaTypes.ObjectId, ref:'Users'},
        to : {type: mongoose.SchemaTypes.ObjectId, ref:'Users'},
        contenu : String,
        date: Date
    }]
});

module.exports  =  mongoose.model("Conversation", conversationSchema);
 