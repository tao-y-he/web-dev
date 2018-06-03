var mongoose = require("mongoose");

var vehicleSchema = new mongoose.Schema({
    plate: String,
    make: String,
    model: String,
    year: String
});
module.exports = mongoose.model("Vehicle", vehicleSchema);