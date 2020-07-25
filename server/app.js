const dbPool = require('./db');
const express =require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




var request = require("request");
var cors = require("cors");


  var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
     corsOptions = { origin: true };
    callback(null, corsOptions); // callback expects two parameters: error and options
  };


app.get("/capsules", cors(corsOptionsDelegate), async (req, res) => {

    request("https://api.spacexdata.com/v3/capsules", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        // do more stuff
        res.send(info);
      }
    });
 
});


app.get("/landpads/:id", cors(corsOptionsDelegate), async (req, res) => {
  
  request("https://api.spacexdata.com/v3/landpads/" + req.params.id, async function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        let rows = await selectData(info);
        //console.log(rows);
        if (!Boolean(rows.length)) {
                 insertData(info);
                 res.status(200);
                 res.send(info);
               }
        else{
                console.log(rows[0].spaceItem);
                res.status(200);
                res.send(rows[0].spaceItem);
            }
      } else {
        res.status(404).send({ message: "In valid input." });
      }
    }
  );
});

async function selectData(info) {
    
  const rows = await dbPool.query("SELECT spaceItem FROM spaceData WHERE id = '" + info.id + "' ");
    return rows;
}
async function insertData(info) {
  let sql = "INSERT INTO spaceData(id,spaceItem) VALUES(?,?)";
  await dbPool.query(sql, [info.id, JSON.stringify(info)], function (
    err,
    result,
    fields
  ) {
    if (err) {
      console.log(err);
      //return res.status(500).json();
    }
  });
   
}


app.get("/", async (req, res) => {
 
  const rows = await dbPool.query("SELECT * FROM spaceData");
  res.status(200);
  res.send({
    result: JSON.stringify(rows),
  });
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);