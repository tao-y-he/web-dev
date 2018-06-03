var mongoose = require("mongoose");
var Owner = require("./models/owner");
var Vehicle = require("./models/vehicle");

    
mongoose.connect("mongodb://localhost/mongodb_exercise", function(err, db){
    /*
    if (err){
        console.log(err);
    }else{
        Vehicle.create({
            plate: "7MMJ713",
            make: "Honda",
            model: "Pilot",
            year: "2006"
        }, function(err, newVehicle){
            if (err){
                console.log(err);
            }else{
              Owner.create({
                  name: "Tao He",
                  address: "511 Anita Ln",
                  city: "Millbrae",
                  state: "CA",
                  vehicles: newVehicle
              }, function(err, newOwner){
                  if (err){
                      console.log(err);
                  }
                  else{
                      db.close();
                  }
              })  
            }
        })
    }
    if (err){
        console.log(err);
    }else{
        Vehicle.create({
            plate: "8MMJ888",
            make: "Mazda",
            model: "3",
            year: "2012"
        }, function(err, newVehicle){
            if (err){
                console.log(err);
            }else{
              Owner.findOne({name: "Tao He"}, function(err, owner){
                  if (err){
                      console.log(err);
                  }
                  else{
                      owner.vehicles.push(newVehicle);
                      owner.save(function(err, updatedOwner){
                          if(err){
                              console.log(err);
                          }else{
                              db.close();
                          }
                      })
                      
                  }
              });  
            }
        });
    }*/
    if (err){
        console.log(err);
    }else{
    Owner.findOne({name: "Tao He"}).populate("vehicles").exec(function(err, owner){
        if (err){
            console.log(err);
        }else{
            console.log(owner);
            db.close();
        }
    });}
});