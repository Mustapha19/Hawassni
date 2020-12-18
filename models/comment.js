var mongoose = require("mongoose");
// ========== Schema setup =================
var commentSchema = new mongoose.Schema({
	text:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	}
});

// ========== attach the schema into a model to map it into a Collection in the DB =================
// export the model 
module.exports = mongoose.model("Comment",commentSchema);