var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema ({
    title: {
        type: String,
    },
    body: {
        type: String,
    }
});

// Creates model from schema
var Comments = mongoose.model("Comments", CommentSchema);

// Exports Comments model
module.exports = Comments;