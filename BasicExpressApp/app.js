var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment!"); 
});
app.get("/speak/:animal", function(req, res){
   var animal = req.params.animal.toLowerCase();
   var animalSounds = {
       pig : "Oink",
       cow : "Moo",
       dog : "Woof Woof"
   }
   res.send("The " + animal + " says '" + animalSounds[animal] + "'!");
});
app.get("/repeat/:phase/:times", function(req, res){
   var phase = req.params.phase;
   var times = Number(req.params.times);
   var msg = "";
   for (var i = 0; i < times; i++){
       msg = msg + phase + " ";
   }
   res.send(msg);
});
app.get("/*", function(req, res){
   res.send("Sorry, page not found...What are you doing with your life?"); 
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("BASIC EXPRESS APP HAS BEEN STARTED");
});