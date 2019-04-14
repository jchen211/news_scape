var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

// Creates model from schema
var Articles = mongoose.model("Articles", ArticleSchema);

// Exports Articles model
module.exports = Articles;
