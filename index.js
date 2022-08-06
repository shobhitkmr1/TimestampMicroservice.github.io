// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function(req, res) {
  let date = req.params.date;
  if (date.match(/\d{5,}/)) {
    date = +date;
  }
  let dates = new Date(date);
  if (dates.toUTCString() == "Invalid Date") {
    //res.json({ unix: dates.valueOf(), utc: dates.toUTCString() });
    res.json({ error: dates.toUTCString() })
  }
  res.json({ unix: dates.valueOf(), utc: dates.toUTCString() });
});

app.get("/api", (req, res) => {
  let dates = new Date();
  res.json({ unix: dates.valueOf(), utc: dates.toUTCString() });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
