var mongoose = require("mongoose");
var ownerSchema = new mongoose.Schema({
   name: String,
   address: String,
   city: String,
   state: String,
   dob: Date,
   vehicles: [{type: mongoose.Schema.Types.ObjectId, ref: "Vehicle"}]
});
module.exports = mongoose.model("Owner", ownerSchema);