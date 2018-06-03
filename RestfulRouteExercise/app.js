var express = require("express"),
    ejs = require("ejs"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

var app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer);
mongoose.connect("mongodb://localhost/dmv");
var vehicleSchema = new mongoose.Schema ({
    make: String,
    model: String,
    year: String,
    color: String
});
var vehicle = mongoose.model("vehicle", vehicleSchema);

//INDEX ROUTE
app.get("/vehicles", function (req, res){
    vehicle.find({}, function(err, vehicles){
        if (err){
            console.log(err);
        }else{
            res.render("vehicles", {vehicles: vehicles});
        }
    });
    
});
//NEW ROUTE
app.get("/vehicles/new", function(req, res){
   res.render("createVehicle"); 
});
//CREATE ROUTE
app.post("/vehicles", function(req, res){
    /*
    var newVehicle = {
        make: req.body.make,
        model:req.body.model,
        year: req.body.year,
        color:req.body.color
    };*/
    req.body.vehicle.color = req.sanitizer(req.body.vehicle.color); //get rid of the script tags
    vehicle.create(req.body.vehicle, function(err, aVehicle){
        if (err){
            res.redirect("/vehicles/new");
        }else{
            res.redirect("/vehicles");
        }
    });
});
//SHOW ROUTE
app.get("/vehicles/:id", function(req, res){
    vehicle.findById(req.params.id, function(err, vehicle){
        if (err){
            res.send(err);
        }else{
            res.render("show", {vehicle: vehicle});
        }
    })
});
//EDIT ROUTE
app.get("/vehicles/:id/edit", function(req, res){
    vehicle.findById(req.params.id, function(err, vehicle){
        if (err){
            res.send(err);
        }else{
            res.render("editVehicle", {vehicle: vehicle});
        }
    })
})
//UPDATE ROUTE
app.put("/vehicles/:id", function(req, res){
   vehicle.findByIdAndUpdate(req.params.id, req.body.vehicle, function(err, updatedVehicled){
        if (err){
            res.send(err);
        }  else{
            res.redirect("/vehicles");
        }
   })
});
//REMOVE ROUTE
app.delete("/vehicles/:id", function(req, res){
   vehicle.findByIdAndRemove(req.params.id, function(err){
       if (err){
           res.send(err);
       }else{
           res.redirect("/vehicles");
       }
   }) 
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Restful Route App has been started");
});