const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const request =  require("request");
// npm modukle request
app.use(express.static("public"));
// put css and image folder in public folder, for static to be put in website
// process.env.PORT-heroku server sau 3000 cand e run local
app.listen( process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
// listen app
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
  res.sendFile(__dirname + "/signup.html");
});
// use html in backend

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;
  console.log( firstName, lName, email);

// use Parser to save the data received in inputs


// post data to an external source, GET gets data from one!!!

// APIN key
// 0e7f352eddc7ac49692b9f8d7b9ebb9e-us14, c29uaWExOjBlN2YzNTJlZGRjN2FjNDk2OTJiOWY4ZDdiOWViYjllLXVzMTQ=
// list id
// 92487fb187

var options = {
  'method': 'POST',
  'url': 'https://us14.api.mailchimp.com/3.0/lists/92487fb187/members',
  'headers': {
    'Authorization': 'Basic c29uaWExOjBlN2YzNTJlZGRjN2FjNDk2OTJiOWY4ZDdiOWViYjllLXVzMTQ=',
    'Content-Type': 'application/json',
    'Cookie': 'ak_bmsc=B9C6819C9425BBB6A8EA733686F4DD58~000000000000000000000000000000~YAAQ1LnEUeruX4h/AQAAnyE/kw+AtlRZs+mB10a1pyL4J0Vh2TmDDKikPgrz0S56/y5t7mhBC22p40JqKOFdtGj4cIAs2X7hPpyVuutjs3T7USDTxx/lm/aMENyRwn+sMdGUKb4u0SbgMt5IMFNy+tF4T1Wc5eJ+umAafdET6lRGj9vyb1qkCYMsSrrp1y9aSzvExzz2V+MuZtoEcajkEk9olqHwRzw8G2xlGQL1NLaWd7JVoA11rhx7psC+MFrCRR91idLu8vTSIvyQIOHZ5WtrF5mDGuKvbf5XfDBzT2YvRbBO8B5awN5D+t3GV8SonkbE2nB2Ck9Ij/TTrzdW/fZBVBuNqWq1fckbeyU15hbCSv/fSXM+BQebArXvAkPfJVGb'
  },
  body: JSON.stringify({
    "email_address": email,
    "status": "subscribed",
    "merge_fields": {
      "FNAME": firstName,
      "LNAME": lName
    }
  })


}
request(options, function (error, response) {
  if (error){
    res.sendFile(__dirname + "/failure.html");
}
  else{
    res.sendFile(__dirname + "/succes.html");
  }
});
});
app.post("/failure", function( req, res){
  res.redirect("/");
});
