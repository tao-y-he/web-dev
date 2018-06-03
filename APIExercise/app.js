var request = require("request"),
    mongoose = require("mongoose");
    
mongoose.connect("mongodb://localhost/weather_forcast", function(err, db){
    if (err){
        console.log(err);
    }else {
        var forcastSchema = new mongoose.Schema({
            city: String,
            state: String,
            date: Date,
            high: Number,
            low:  Number,
            text: String
        });
        var dailyForcast = mongoose.model("forcast", forcastSchema);
        
        request("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22san%20francisco%2C%20ca%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function (error, response, body){
            if (!error && response.statusCode == 200){
                
                var parsedData = JSON.parse(body);
                //console.log(parsedData["query"]["results"]["channel"]["item"]["forecast"]);
                var size = (parsedData["query"]["results"]["channel"]["item"]["forecast"]).length;
                var forcasts = [];
                for (var i=0; i<size; i++){
                    console.log((parsedData["query"]["results"]["channel"]["item"]["forecast"])[i]);
                    console.log("text: " + ((parsedData["query"]["results"]["channel"]["item"]["forecast"])[i]).text);
                    
                    var forcast = {
                      city: "San Francisco",
                      state: "CA",
                      date: ((parsedData["query"]["results"]["channel"]["item"]["forecast"])[i]).date,
                      high: ((parsedData["query"]["results"]["channel"]["item"]["forecast"])[i]).high,
                      low: ((parsedData["query"]["results"]["channel"]["item"]["forecast"])[i]).low,
                      text: ((parsedData["query"]["results"]["channel"]["item"]["forecast"])[i]).text
                    };
                    forcasts.push(forcast);
                    console.log(forcasts);
                }
                    /*
                    dailyForcast.create(forcast, function(err, returnedForcast){
                        if (err){
                            console.log(err);
                        }
                        else{
                            console.log("created");
                        }
                        
                    });*/
                
                db.collection("forcasts").insertMany(forcasts, function(err, inserted){
                    if (err){
                        console.log(err);
                    }else{
                        db.close();
                    }
                    
                });
                console.log(i + " days forcast");
                
            }
            
        });
    }
});